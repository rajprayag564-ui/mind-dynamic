import { NextResponse } from "next/server";
import { getFirestore, serverTimestamp } from "@/lib/firebase/admin";
import { flagshipCourse } from "@/lib/course-data";

type Body = {
  productId: string;
  utr: string;
};

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();
    if (!body?.productId || !body?.utr) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/dfm_session=([^;;\s]+)/);
    const uid = match ? match[1] : null;
    if (!uid) return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const product = flagshipCourse.courseOffers.find((p) => p.id === body.productId);
    const amount = product ? product.priceInr : null;

    const db = getFirestore();
    const docRef = db.collection("purchases").doc();
    const purchaseDoc = {
      id: docRef.id,
      userId: uid,
      productId: body.productId,
      type: body.productId === "career-test-bundle" ? "bundle" : "course",
      utr: body.utr,
      amount: amount,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    await docRef.set(purchaseDoc);
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || String(err) }, { status: 500 });
  }
}
