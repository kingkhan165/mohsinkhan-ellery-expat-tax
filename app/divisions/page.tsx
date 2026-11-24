import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import Arrow from "@/components/Arrow";
import { divisions } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Who We Help: US Expat Tax by Situation",
  description: "US tax help organised by situation: families abroad, business owners, accidental Americans, people moving, green card holders and high-net-worth families.",
  path: "/divisions/",
});

export default function DivisionsHub() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Who we help", path: "/divisions/" }]} />
      <header className="page-head">
        <h1>Who we help</h1>
        <p className="lede">Six divisions, each with a team that files for people in that position every week.</p>
      </header>
      <ul className="rows">
        {divisions.map((d) => (
          <li key={d.slug}>
            <Link href={`/divisions/${d.slug}/`}>
              <span className="t">{d.title}</span>
              <span className="d">{d.answer}</span>
              <span className="arr"><Arrow /></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
