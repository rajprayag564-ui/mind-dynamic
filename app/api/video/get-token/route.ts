import { NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebase/admin";
import crypto from "crypto";
import { flagshipCourse } from "@/lib/course-data";

type Body = { courseId: string; lessonId?: string };

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();
    if (!body?.courseId) return NextResponse.json({ message: "Missing courseId" }, { status: 400 });

    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/dfm_session=([^;;\s]+)/);
    const uid = match ? match[1] : null;
    if (!uid) return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const db = getFirestore();
    const q = await db
      .collection("purchases")
      .where("userId", "==", uid)
      .where("productId", "==", body.courseId)
      .where("status", "==", "active")
      .limit(1)
      .get();
    if (q.empty) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const course = flagshipCourse.courseOffers.find((offer) => offer.id === body.courseId);
    if (!course) return NextResponse.json({ message: "Course not found" }, { status: 404 });

    let videoId: string | null = null;
    // Prefer lesson-level mapping when lessonId provided
    if (body.lessonId && Array.isArray(course.lessons)) {
      const lesson = course.lessons.find((l) => l.id === body.lessonId);
      if (lesson && lesson.bunnyVideoId) videoId = lesson.bunnyVideoId.trim();
    }

    // Fallback to course-level bunnyVideoId for backward compatibility
    if (!videoId) videoId = course?.bunnyVideoId?.trim() || null;

    if (!videoId) {
      return NextResponse.json({ message: "Missing Bunny video mapping for requested lesson" }, { status: 500 });
    }

    const libraryId = process.env.BUNNY_VIDEO_LIBRARY_ID;
    const securityKey = process.env.BUNNY_TOKEN_SECURITY_KEY;
    if (!libraryId || !securityKey) {
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    // expires in seconds since epoch (2 hours)
    const expires = Math.floor(Date.now() / 1000) + 2 * 60 * 60;

    // Signature: sha256 of securityKey + videoId + expires
    const sigBase = `${securityKey}${videoId}${expires}`;
    const signature = crypto.createHash("sha256").update(sigBase).digest("hex");

    const token = signature;

    return NextResponse.json({ token, expires, libraryId, videoId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || String(err) }, { status: 500 });
  }
}
