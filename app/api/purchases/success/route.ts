import { NextResponse } from "next/server";
import crypto from "crypto";
import { getFirestore, serverTimestamp } from "@/lib/firebase/admin";

type Body = {
  purchaseId: string;
  orderId: string;
  paymentId: string;
  signature: string;
};

function verifySignature(orderId: string, paymentId: string, signature: string) {
  const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!secret) {
    throw new Error("Razorpay is not configured");
  }

  const payload = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();
    if (!body?.purchaseId || !body?.orderId || !body?.paymentId || !body?.signature) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/dfm_session=([^;;\s]+)/);
    const uid = match ? match[1] : null;
    if (!uid) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!verifySignature(body.orderId, body.paymentId, body.signature)) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
    }

    const db = getFirestore();
    const purchaseRef = db.collection("purchases").doc(body.purchaseId);
    const purchaseSnap = await purchaseRef.get();

    if (!purchaseSnap.exists) {
      return NextResponse.json({ message: "Purchase not found" }, { status: 404 });
    }

    const purchase = purchaseSnap.data();
    if (purchase?.userId !== uid) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await purchaseRef.set(
      {
        status: "active",
        razorpayOrderId: body.orderId,
        razorpayPaymentId: body.paymentId,
        razorpaySignature: body.signature,
        activatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Failed to activate purchase" }, { status: 500 });
  }
}
