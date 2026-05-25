import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Razorpay from "razorpay";
import { getFirestore, serverTimestamp } from "@/lib/firebase/admin";
import { flagshipCourse } from "@/lib/course-data";

type Body = {
  courseId: string;
};

function getRazorpayClient() {
  const key_id = process.env.RAZORPAY_KEY_ID?.trim();
  const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!key_id || !key_secret) {
    throw new Error("Razorpay is not configured");
  }

  return new Razorpay({ key_id, key_secret });
}

function getSessionUid() {
  const raw = cookies().get("dfm_session")?.value;
  if (!raw) return null;

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();
    if (!body?.courseId) {
      return NextResponse.json({ message: "Missing courseId" }, { status: 400 });
    }

    const uid = getSessionUid();
    if (!uid) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const product = flagshipCourse.courseOffers.find((offer) => offer.id === body.courseId);
    if (!product) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    const amountInr = Number(product.priceInr);
    if (!Number.isFinite(amountInr) || amountInr <= 0) {
      return NextResponse.json({ message: "Invalid course price" }, { status: 500 });
    }

    const db = getFirestore();
    const purchaseRef = db.collection("purchases").doc();
    const purchaseId = purchaseRef.id;
    const amountPaise = Math.round(amountInr * 100);

    const client = getRazorpayClient();
    const order = await client.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: purchaseId,
      payment_capture: true,
      notes: {
        purchaseId,
        courseId: body.courseId,
        userId: uid,
      },
    });

    await purchaseRef.set({
      id: purchaseId,
      userId: uid,
      productId: body.courseId,
      type: body.courseId === "career-test-bundle" ? "bundle" : "course",
      amount: amountInr,
      status: "pending",
      orderId: order.id,
      razorpayOrderId: order.id,
      razorpayReceipt: purchaseId,
      createdAt: serverTimestamp(),
    });

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() || process.env.RAZORPAY_KEY_ID?.trim();
    return NextResponse.json({
      keyId,
      orderId: order.id,
      purchaseId,
      amount: amountPaise,
      currency: "INR",
      courseId: body.courseId,
      title: product.title,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Order creation failed" }, { status: 500 });
  }
}
