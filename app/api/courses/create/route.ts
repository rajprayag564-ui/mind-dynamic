import { NextResponse } from "next/server";
import { getFirestore, serverTimestamp } from "@/lib/firebase/admin";

type CoursePayload = {
  courseTitle: string;
  courseDescription: string;
  price: number;
  bunnyStreamVideoLink: string;
  pdfResourceLink: string;
};

function validatePayload(body: unknown): body is CoursePayload {
  if (!body || typeof body !== "object") {
    return false;
  }

  const payload = body as Record<string, unknown>;

  return (
    typeof payload.courseTitle === "string" &&
    payload.courseTitle.trim().length > 0 &&
    typeof payload.courseDescription === "string" &&
    payload.courseDescription.trim().length > 0 &&
    typeof payload.price === "number" &&
    payload.price > 0 &&
    typeof payload.bunnyStreamVideoLink === "string" &&
    payload.bunnyStreamVideoLink.trim().length > 0 &&
    typeof payload.pdfResourceLink === "string" &&
    payload.pdfResourceLink.trim().length > 0
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        {
          message:
            "Missing or invalid fields. Required: courseTitle, courseDescription, price (number > 0), bunnyStreamVideoLink, pdfResourceLink",
        },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const courseRef = db.collection("courses").doc();

    const courseData = {
      id: courseRef.id,
      courseTitle: body.courseTitle.trim(),
      courseDescription: body.courseDescription.trim(),
      price: body.price,
      bunnyStreamVideoLink: body.bunnyStreamVideoLink.trim(),
      pdfResourceLink: body.pdfResourceLink.trim(),
      createdAt: serverTimestamp(),
    };

    await courseRef.set(courseData);

    return NextResponse.json(
      {
        message: "Course created successfully",
        id: courseRef.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error creating course:", message);

    return NextResponse.json(
      {
        message: "Failed to create course",
        error: message,
      },
      { status: 500 }
    );
  }
}
