import type { MetadataRoute } from "next";
import config from "@config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.site.url;
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
