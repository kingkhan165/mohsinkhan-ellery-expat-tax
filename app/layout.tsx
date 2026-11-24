import type { Metadata, Viewport } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { orgLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | US Tax Services for Americans Abroad`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#e6e5e0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[orgLd, { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, publisher: { "@id": `${site.url}/#org` } }]} />
      </body>
    </html>
  );
}
