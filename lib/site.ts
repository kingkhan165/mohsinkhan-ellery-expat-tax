// Demo brand. "Ellery Expat Tax" is a fictional firm used for this demo build.
export const site = {
  name: "Ellery Expat Tax",
  short: "Ellery",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ellery-expat-tax.vercel.app").replace(/\/$/, ""),
  email: "hello@elleryexpattax.com",
  description:
    "US tax returns, FBAR, FATCA and catch-up filings for Americans living abroad. Specialists in expat compliance, treaties and cross-border planning.",
  taxYear: 2026,
};

export const nav = [
  { key: "services", label: "Services", href: "/services/" },
  { key: "forms", label: "Forms", href: "/forms/" },
  { key: "divisions", label: "Who we help", href: "/divisions/" },
  { key: "countries", label: "Countries", href: "/countries/" },
  { key: "pricing", label: "Pricing", href: "/pricing/" },
  { key: "resources", label: "Resources", href: "/resources/" },
] as const;
