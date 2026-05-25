import type { MetadataRoute } from "next";
import { flagshipCourse } from "@/lib/course-data";

function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.VERCEL_URL;

  if (!envUrl) {
    return "http://localhost:3000";
  }

  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }

  return `https://${envUrl}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/enroll`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/success-stories`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = flagshipCourse.courseOffers.map((course) => ({
    url: `${siteUrl}/courses/${course.id}`,
    lastModified: now,
    changeFrequency: course.status === "active" ? "weekly" : "monthly",
    priority: course.status === "active" ? 0.85 : 0.55,
  }));

  return [...staticRoutes, ...courseRoutes];
}
