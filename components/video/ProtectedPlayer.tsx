"use client";

import { useEffect, useState } from "react";

type Props = {
  productId: string | null;
  lessonId?: string | null;
};

type TokenResponse = {
  token?: string;
  expires?: number;
  libraryId?: string;
  videoId?: string;
  message?: string;
};

export default function ProtectedPlayer({ productId, lessonId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchToken() {
      if (!productId) {
        setError("No purchase found");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const body: { courseId: string; lessonId?: string } = { courseId: productId };
        if (lessonId) body.lessonId = lessonId;

        const res = await fetch("/api/video/get-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(body),
        });

        if (res.status === 403) {
          throw new Error("Access denied");
        }

        const data = (await res.json().catch(() => ({}))) as TokenResponse;
        if (!res.ok) {
          throw new Error(data.message || "Server error");
        }

        const { token, expires, libraryId, videoId } = data;
        if (!token || !expires || !libraryId || !videoId) {
          throw new Error("Invalid token response");
        }

        const src = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=${token}&expires=${expires}`;
        if (!cancelled) {
          setEmbedSrc(src);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message || "Failed to get token");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchToken();

    return () => {
      cancelled = true;
    };
  }, [lessonId, productId]);

  if (!productId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-[color:var(--color-text)]/20 bg-[#0b102f] text-center">
        <p className="text-sm text-blue-200">No purchase found.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-[color:var(--color-text)]/20 bg-[#0b102f] text-center">
        <p className="text-sm text-blue-200">Loading video…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-[color:var(--color-text)]/20 bg-[#0b102f] text-center">
        <p className="text-sm text-rose-400">{error}</p>
      </div>
    );
  }

  if (!embedSrc) return null;

  return (
    <div className="aspect-video w-full">
      <iframe
        src={embedSrc}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        className="h-full w-full rounded-lg"
        title="Course video"
      />
    </div>
  );
}
