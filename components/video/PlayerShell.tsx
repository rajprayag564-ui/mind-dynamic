"use client";

import { useEffect, useState } from "react";
import LessonPlaylist from "./LessonPlaylist";
import ProtectedPlayer from "./ProtectedPlayer";
import { flagshipCourse } from "@/lib/course-data";

type Props = {
  productId: string | null;
  isActive: boolean;
};

export default function PlayerShell({ productId, isActive }: Props) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    const course = flagshipCourse.courseOffers.find((c) => c.id === productId);
    if (course?.lessons?.length) {
      setActiveLessonId(course.lessons[0].id);
    } else {
      setActiveLessonId(null);
    }
  }, [productId]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
      <div>
        <ProtectedPlayer productId={productId} lessonId={activeLessonId} />
      </div>
      <aside>
        <LessonPlaylist
          productId={productId}
          isActive={isActive}
          activeLessonId={activeLessonId}
          onSelect={(id) => setActiveLessonId(id)}
        />
      </aside>
    </div>
  );
}
