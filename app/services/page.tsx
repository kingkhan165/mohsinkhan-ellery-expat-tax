import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import { services, serviceGroups } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "US Expat Tax Services",
  description: "Every service we offer Americans abroad: annual returns, FBAR, FATCA, Streamlined catch-up, treaties, pensions, PFICs, foreign companies, trusts and expatriation.",
  path: "/services/",
});

export default function ServicesHub() {
  return (
    <div className="wrap">
      <Crumbs items={[{ name: "Services", path: "/services/" }]} />
      <header className="page-head">
        <h1>Services for Americans abroad</h1>
        <p className="lede">Grouped by what you need. Each page starts with a short answer, then the forms involved and who it is for.</p>
      </header>
      {serviceGroups.map((g) => (
        <section key={g} className="band tight" style={{ paddingTop: 0 }}>
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>{g}</h2>
          <ul className="tiles">
            {services.filter((s) => s.group === g).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`}>
                  <span className="tt">{s.title}</span>
                  <span className="td">{s.answer.split(". ")[0]}.</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
