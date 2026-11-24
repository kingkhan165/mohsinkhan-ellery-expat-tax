import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const crumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});

export const faqLd = (qa: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export const orgLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${site.url}/#org`,
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  areaServed: "Worldwide",
  knowsAbout: ["US expat taxes", "FBAR", "FATCA", "Foreign Earned Income Exclusion", "Foreign Tax Credit", "Streamlined Filing Compliance Procedures", "PFIC", "Form 5471", "Expatriation tax"],
};
