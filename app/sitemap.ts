import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services, forms, divisions, countries } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["/", "/about/", "/divisions/", "/services/", "/forms/", "/countries/", "/contact/", "/contact/book/", "/contact/quote/", "/pricing/", "/faqs/", "/resources/", "/resources/deadlines/", "/resources/glossary/", "/privacy/", "/terms/", "/cookies/"];
  const paths = [
    ...fixed,
    ...divisions.map((d) => `/divisions/${d.slug}/`),
    ...services.map((s) => `/services/${s.slug}/`),
    ...forms.map((f) => `/forms/${f.slug}/`),
    ...countries.map((c) => `/countries/${c.slug}/`),
  ];
  const now = new Date();
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly", priority: p === "/" ? 1 : p.split("/").length > 3 ? 0.7 : 0.8 }));
}
