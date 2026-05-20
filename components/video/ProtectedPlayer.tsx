"use client";

import { useEffect, useState } from "react";

type Props = {
  productId: string | null;
};

export default function ProtectedPlayer({ productId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError("No purchase found");
      return;
    }

    async function fetchToken() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/video/get-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ courseId: productId }),
        });

        if (res.status === 403) {
          setError("Access denied");
          return;
        }

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || "Server error");
        }

        const data = await res.json();
        const { token, expires, libraryId, videoId } = data;
        if (!token || !expires || !libraryId || !videoId) {
          throw new Error("Invalid token response");
        }

        const src = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=${token}&expires=${expires}`;
        setEmbedSrc(src);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message || "Failed to get token");
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [productId]);

  if (!productId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#0b102f] text-center">
        <p className="text-sm text-blue-200">No purchase found.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#0b102f] text-center">
        <p className="text-sm text-blue-200">Loading video…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#0b102f] text-center">
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
