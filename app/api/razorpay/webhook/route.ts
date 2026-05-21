import { NextResponse } from "next/server";
import crypto from "crypto";
import { getFirestore, serverTimestamp } from "@/lib/firebase/admin";

function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();
  if (!secret) {
    throw new Error("Razorpay webhook secret is not configured");
  }

  if (!signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

async function markPurchaseActive(orderId: string, paymentId?: string) {
  const db = getFirestore();
  const purchases = await db.collection("purchases").where("razorpayOrderId", "==", orderId).limit(1).get();
  if (purchases.empty) return false;

  const doc = purchases.docs[0];
  await doc.ref.set(
    {
      status: "active",
      razorpayPaymentId: paymentId || null,
      activatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return true;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ message: "Invalid webhook signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody) as {
      event?: string;
      payload?: { payment?: { entity?: { id?: string; order_id?: string; status?: string } } };
    };

    if (event.event === "payment.captured") {
      const payment = event.payload?.payment?.entity;
      const orderId = payment?.order_id;
      if (orderId) {
        await markPurchaseActive(orderId, payment?.id);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Webhook handling failed" }, { status: 500 });
  }
}
