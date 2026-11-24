import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "@/components/Crumbs";
import Faq from "@/components/Faq";
import CtaAside from "@/components/CtaAside";
import { countries, getForm } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => countries.map((c) => ({ slug: c.slug }));
const find = (slug: string) => countries.find((c) => c.slug === slug);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) return {};
  return pageMeta({
    title: `US Taxes for Americans Living ${cap(c.inName)}`,
    description: `How US expat taxes work ${c.inName}: ${c.treaty ? "the tax treaty" : "no tax treaty"}, ${c.totalization ? "the totalization agreement" : "no totalization agreement"}, local pensions, PFIC traps and deadlines.`,
    path: `/countries/${c.slug}/`,
  });
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  const n = c.name.replace(/^the /, "");
  const answer = `Americans living ${c.inName} still file a US return every year, plus an FBAR if their local accounts pass $10,000. ${c.treaty ? `The US–${n} income tax treaty helps mainly with pensions and residency questions, because its saving clause keeps US citizens taxable.` : `There is no US–${n} income tax treaty, so relief comes only from the foreign earned income exclusion and the foreign tax credit.`} ${c.totalization ? `A totalization agreement decides which country's social security you pay into.` : `With no totalization agreement in force, self-employed Americans may owe social security in both countries.`}`;
  const faqs: [string, string][] = [
    [`Is there a US–${n} tax treaty?`, c.treaty ? `Yes. It covers areas such as pensions and residency tie-breakers, but the saving clause means US citizens are still taxed by the US on worldwide income.` : `No. Americans ${c.inName} rely on the foreign earned income exclusion and the foreign tax credit.`],
    [`Does ${n} have a totalization agreement with the US?`, c.totalization ? `Yes. It assigns social security coverage to one country and can exempt you from US self-employment tax with a certificate of coverage.` : `No agreement is in force, so self-employed Americans can owe US self-employment tax as well as local contributions.`],
    [`When are tax returns due ${c.inName}?`, `${c.localDeadline}. The tax year is ${c.taxYear.toLowerCase()}. Your US return is due June 15 if you live abroad, extendable to October 15.`],
  ];
  return (
    <div className="wrap">
      <Crumbs items={[{ name: "Countries", path: "/countries/" }, { name: n, path: `/countries/${c.slug}/` }]} />
      <header className="page-head">
        <h1>US taxes for Americans {c.inName}</h1>
      </header>
      <div className="split rev" style={{ paddingBottom: 96 }}>
        <article className="content">
          <div className="answer"><h2>The short answer</h2><p>{answer}</p></div>
          <table className="facts">
            <tbody>
              <tr><th scope="row">Income tax treaty</th><td>{c.treaty ? "Yes" : "No"}</td></tr>
              <tr><th scope="row">Totalization agreement</th><td>{c.totalization ? "Yes" : "No"}</td></tr>
              <tr><th scope="row">Local tax year</th><td>{c.taxYear}</td></tr>
              <tr><th scope="row">Local filing deadline</th><td>{c.localDeadline}</td></tr>
              <tr><th scope="row">US filing deadline</th><td>June 15 (October 15 with an extension)</td></tr>
            </tbody>
          </table>
          <section><h2>Local pensions and savings</h2><p className="prose">{c.pensions}</p></section>
          <section><h2>Traps we see most</h2><p className="prose">{c.traps}</p></section>
          <section>
            <h2>Forms most Americans {c.inName} file</h2>
            <ul className="tiles">
              {["1040", c.slug === "uae" ? "2555" : "1116", "fbar", "8621"].map((s) => getForm(s)!).map((f) => (
                <li key={f.slug}><Link href={`/forms/${f.slug}/`}><span className="tc">{f.code}</span><span className="td">{f.name}</span></Link></li>
              ))}
            </ul>
          </section>
          <section><h2>Common questions</h2><Faq items={faqs} /></section>
        </article>
        <div><CtaAside topic="expat-tax-returns" heading={`Living ${c.inName}?`} text={`Book a 30-minute call with a specialist who files for Americans ${c.inName} every season.`} /></div>
      </div>
    </div>
  );
}
