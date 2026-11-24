import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "@/components/Crumbs";
import Faq from "@/components/Faq";
import CtaAside from "@/components/CtaAside";
import JsonLd from "@/components/JsonLd";
import { services, getService, formsForService, divisionsForService } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.title, description: s.answer.slice(0, 155).replace(/\s\S*$/, "") + "…", path: `/services/${s.slug}/` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const fs = formsForService(s.slug);
  const ds = divisionsForService(s.slug);
  const related = services.filter((x) => x.group === s.group && x.slug !== s.slug);
  const faqs: [string, string][] = [
    [`Who is ${s.title.split(" (")[0]} for?`, s.answer.split(". ").slice(0, 2).join(". ").replace(/\.?$/, ".")],
    ["Which forms are involved?", fs.length ? `Usually ${fs.map((f) => f.code).join(", ")}. We confirm the exact list on your first call.` : "It depends on your situation. We confirm the exact list on your first call."],
    ["How do I get started?", "Book a 30-minute consultation. We review your situation and send a fixed quote before any work begins."],
  ];
  return (
    <div className="wrap">
      <Crumbs items={[{ name: "Services", path: "/services/" }, { name: s.title, path: `/services/${s.slug}/` }]} />
      <header className="page-head">
        <p className="small">{s.group}</p>
        <h1>{s.title}</h1>
      </header>
      <div className="split rev" style={{ paddingBottom: 96 }}>
        <article className="content">
          <div className="answer">
            <h2>The short answer</h2>
            <p>{s.answer}</p>
          </div>
          <section>
            <h2>What's included</h2>
            <ul className="checks">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </section>
          {fs.length > 0 && (
            <section>
              <h2>Forms we prepare</h2>
              <ul className="tiles">
                {fs.map((f) => (
                  <li key={f.slug}><Link href={`/forms/${f.slug}/`}><span className="tc">{f.code}</span><span className="td">{f.name}</span></Link></li>
                ))}
              </ul>
            </section>
          )}
          {ds.length > 0 && (
            <section>
              <h2>Often needed by</h2>
              <ul className="checks">{ds.map((d) => <li key={d.slug}><Link className="ulink" href={`/divisions/${d.slug}/`}>{d.title}</Link></li>)}</ul>
            </section>
          )}
          <section>
            <h2>Common questions</h2>
            <Faq items={faqs} />
          </section>
          {related.length > 0 && (
            <section>
              <h2>Related services</h2>
              <ul className="checks">{related.map((r) => <li key={r.slug}><Link className="ulink" href={`/services/${r.slug}/`}>{r.title}</Link></li>)}</ul>
            </section>
          )}
        </article>
        <div><CtaAside topic={s.slug} heading="Talk it through with a specialist" /></div>
      </div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.answer, serviceType: s.group, provider: { "@id": `${site.url}/#org` }, areaServed: "Worldwide", url: `${site.url}/services/${s.slug}/` }} />
    </div>
  );
}
