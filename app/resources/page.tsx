import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Resources for Americans Abroad", description: "Deadline calendar, glossary, form guides and country guides for US expat taxes.", path: "/resources/" });

const items = [
  ["/resources/deadlines/", "Expat tax deadlines calendar", "Every date for the 2026 tax year, with a countdown to the next one."],
  ["/resources/glossary/", "Glossary", "Short definitions of the terms that appear on every expat return."],
  ["/forms/", "Form guides", "Thirty IRS and FinCEN forms explained in plain English."],
  ["/countries/", "Country guides", "Treaties, pensions and local deadlines for 16 countries."],
  ["/faqs/", "FAQs", "The questions Americans abroad ask first."],
];

export default function Resources() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Resources", path: "/resources/" }]} />
      <header className="page-head">
        <h1>Resources</h1>
        <p className="lede">Reference material we keep up to date each tax season. Articles and guides publish here from the blog.</p>
      </header>
      <ul className="tiles">
        {items.map(([h, t, d]) => <li key={h}><Link href={h}><span className="tt">{t}</span><span className="td">{d}</span></Link></li>)}
      </ul>
    </div>
  );
}
