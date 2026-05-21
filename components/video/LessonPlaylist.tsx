"use client";

import { PlayCircle, Lock } from "lucide-react";
import { flagshipCourse } from "@/lib/course-data";

type Props = {
  productId: string | null;
  isActive: boolean;
  activeLessonId: string | null;
  onSelect: (lessonId: string) => void;
};

export default function LessonPlaylist({ productId, isActive, activeLessonId, onSelect }: Props) {
  if (!productId) return null;

  const course = flagshipCourse.courseOffers.find((c) => c.id === productId);
  const lessons = course?.lessons || [];

  return (
    <div className="w-full">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/70">Lessons</h3>
      <ul className="space-y-2">
        {lessons.map((lesson) => {
          const unlocked = isActive;
          const selected = lesson.id === activeLessonId;
          return (
            <li
              key={lesson.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-[#101943] px-3 py-2 text-white ${
                selected ? "ring-2 ring-cyan-400" : ""
              }`}
              onClick={() => unlocked && onSelect(lesson.id)}
            >
              <div className="flex items-center gap-3">
                {unlocked ? <PlayCircle className="h-4 w-4 text-cyan-300" /> : <Lock className="h-4 w-4 text-sky-300" />}
                <span className="text-sm">{lesson.title}</span>
              </div>
              <span className="text-xs text-white/70">{lesson.duration}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
