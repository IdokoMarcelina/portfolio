import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, priority: 1 },
    ...projects.map((p) => ({ url: `${profile.url}/work/${p.slug}`, priority: 0.8 })),
  ];
}
