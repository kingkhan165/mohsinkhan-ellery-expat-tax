import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "@/components/Crumbs";
import Faq from "@/components/Faq";
import CtaAside from "@/components/CtaAside";
import JsonLd from "@/components/JsonLd";
import { forms, getForm, getService } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => forms.map((f) => ({ slug: f.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const f = getForm((await params).slug);
  if (!f) return {};
  return pageMeta({ title: `${f.code}: ${f.name} for US Expats`, description: f.purpose.slice(0, 155).replace(/\s\S*$/, "") + "…", path: `/forms/${f.slug}/` });
}

export default async function FormPage({ params }: { params: Promise<{ slug: string }> }) {
  const f = getForm((await params).slug);
  if (!f) notFound();
  const svc = getService(f.service)!;
  const same = forms.filter((x) => x.group === f.group && x.slug !== f.slug);
  const faqs: [string, string][] = [
    [`What is ${f.code}?`, f.purpose],
    [`Who has to file ${f.code}?`, f.who],
    [`When is ${f.code} due?`, `${f.due}.`],
  ];
  return (
    <div className="wrap">
      <Crumbs items={[{ name: "Forms", path: "/forms/" }, { name: f.code, path: `/forms/${f.slug}/` }]} />
      <header className="page-head">
        <p className="small">{f.group}</p>
        <h1>{f.code}: {f.name}</h1>
      </header>
      <div className="split rev" style={{ paddingBottom: 96 }}>
        <article className="content">
          <div className="answer">
            <h2>What it's for</h2>
            <p>{f.purpose}</p>
          </div>
          <table className="facts">
            <tbody>
              <tr><th scope="row">Who files</th><td>{f.who}</td></tr>
              <tr><th scope="row">When it's due</th><td>{f.due}</td></tr>
              <tr><th scope="row">Filed with</th><td>{f.slug === "fbar" ? "FinCEN's BSA E-Filing System, separately from your tax return" : f.due === "With your Form 1040, including extensions" ? "Your federal income tax return" : "The IRS"}</td></tr>
              <tr><th scope="row">We prepare it under</th><td><Link className="ulink" href={`/services/${svc.slug}/`}>{svc.title}</Link></td></tr>
            </tbody>
          </table>
          <section>
            <h2>Common questions</h2>
            <Faq items={faqs} />
          </section>
          <section>
            <h2>Other forms in {f.group.toLowerCase()}</h2>
            <ul className="tiles">
              {same.map((x) => <li key={x.slug}><Link href={`/forms/${x.slug}/`}><span className="tc">{x.code}</span><span className="td">{x.name}</span></Link></li>)}
            </ul>
          </section>
        </article>
        <div><CtaAside topic={svc.slug} heading={`Need ${f.code} filed?`} text={`We prepare ${f.code} as part of ${svc.title.split(" (")[0].toLowerCase().replace(/^us /, "US ")}. Start with a 30-minute call and a fixed quote.`} /></div>
      </div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: `${f.code}: ${f.name}`, description: f.purpose, about: f.code, author: { "@id": `${site.url}/#org` }, publisher: { "@id": `${site.url}/#org` }, mainEntityOfPage: `${site.url}/forms/${f.slug}/` }} />
    </div>
  );
}
