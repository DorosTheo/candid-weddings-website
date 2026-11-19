import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { weddings } from "@/data/weddings";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "weekly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
    { path: "/real-weddings", priority: 0.9, changeFrequency: "weekly" },
    { path: "/experience", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, priority: p.priority, changeFrequency: p.changeFrequency })),
    // Placeholder stories are excluded until real weddings replace them.
    ...weddings
      .filter((w) => !w.placeholder)
      .map((w) => ({
        url: `${site.url}/real-weddings/${w.slug}`,
        priority: 0.7,
        changeFrequency: "yearly" as const,
        images: [`${site.url}${w.cover.src}`],
      })),
  ];
}
