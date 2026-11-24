import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "@/components/Crumbs";
import CtaAside from "@/components/CtaAside";
import { divisions, getService } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => divisions.map((d) => ({ slug: d.slug }));
const find = (slug: string) => divisions.find((d) => d.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = find((await params).slug);
  if (!d) return {};
  return pageMeta({ title: `US Tax Help for ${d.title}`, description: d.answer.slice(0, 155).replace(/\s\S*$/, "") + "…", path: `/divisions/${d.slug}/` });
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = find((await params).slug);
  if (!d) notFound();
  const svcs = d.services.map((s) => getService(s)!);
  return (
    <div className="wrap">
      <Crumbs items={[{ name: "Who we help", path: "/divisions/" }, { name: d.title, path: `/divisions/${d.slug}/` }]} />
      <header className="page-head">
        <h1>{d.title}</h1>
        <p className="lede">{d.answer}</p>
      </header>
      <div className="split rev" style={{ paddingBottom: 96 }}>
        <section className="content">
          <h2>Services that usually apply</h2>
          <ul className="tiles">
            {svcs.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}/`}><span className="tt">{s.title}</span><span className="td">{s.answer.split(". ")[0]}.</span></Link></li>
            ))}
          </ul>
        </section>
        <div><CtaAside topic={svcs[0].slug} /></div>
      </div>
    </div>
  );
}
