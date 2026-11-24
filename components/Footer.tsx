import Link from "next/link";
import { site } from "@/lib/site";

const cols = [
  { h: "Firm", links: [["About us", "/about/"], ["Who we help", "/divisions/"], ["Pricing", "/pricing/"], ["Contact", "/contact/"], ["Client portal", "#portal"]] },
  { h: "Learn", links: [["Services", "/services/"], ["Forms", "/forms/"], ["Countries", "/countries/"], ["Deadlines", "/resources/deadlines/"], ["Glossary", "/resources/glossary/"], ["FAQs", "/faqs/"]] },
  { h: "Legal", links: [["Privacy policy", "/privacy/"], ["Terms of engagement", "/terms/"], ["Cookie policy", "/cookies/"], ["Sitemap", "/sitemap.xml"]] },
];

export default function Footer() {
  return (
    <footer className="ftr dark">
      <div className="wrap">
        <div className="ftr-top">
          <div>
            <h2>Not sure what you need to file?</h2>
            <Link className="btn" href="/contact/book/">Book a consultation</Link>
            <p className="small" style={{ marginTop: 18 }}>Or write to {site.email}</p>
          </div>
          <div className="ftr-cols">
            {cols.map((c) => (
              <div key={c.h}>
                <h3>{c.h}</h3>
                {c.links.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
              </div>
            ))}
          </div>
        </div>
        <div className="ftr-bot">
          <span>© {new Date().getFullYear()} {site.name}. Demo build: the firm, prices and sample content are illustrative.</span>
          <span>Information on this site is general and is not tax advice for your situation.</span>
        </div>
        <div className="mark" aria-hidden="true">Ellery</div>
      </div>
    </footer>
  );
}
