import Link from "next/link";
import Checker from "@/components/Checker";
import Steps from "@/components/Steps";
import Deadlines from "@/components/Deadlines";
import Ribbon from "@/components/Ribbon";
import Faq from "@/components/Faq";
import Arrow from "@/components/Arrow";
import { divisions, services, serviceGroups, generalFaqs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "US Tax Services for Americans Abroad",
  description:
    "US expat tax returns, FBAR, FATCA and Streamlined catch-up filings for Americans living abroad. Check which forms you need and book a consultation.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>
            <span className="ln"><span>US taxes, filed</span></span>
            <span className="ln"><span>correctly from</span></span>
            <span className="ln"><span>wherever you live.</span></span>
          </h1>
          <div className="hero-grid">
            <div className="hero-side">
              <p className="lede">
                Americans abroad still file every year. We prepare your return, your FBAR and every form that comes with
                foreign accounts, pensions and companies, and file it on time.
              </p>
              <div className="hero-actions">
                <Link className="btn" href="/contact/book/">Book a consultation</Link>
                <Link className="btn ghost" href="/pricing/">See pricing</Link>
              </div>
              <ul className="leaders" aria-label="Key figures for tax year 2026">
                <li><span>Foreign earned income exclusion</span><b>$132,900</b></li>
                <li><span>FBAR threshold, all accounts</span><b>$10,000</b></li>
                <li><span>Filing deadline if you live abroad</span><b>June 15</b></li>
                <li><span>Extended deadline</span><b>October 15</b></li>
              </ul>
            </div>
            <Checker />
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Start from who you are</h2>
            <p>Each page lists the filings that usually apply to people in your position, so you know what to ask about.</p>
          </div>
          <ul className="rows">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link href={`/divisions/${d.slug}/`}>
                  <span className="t">{d.title}</span>
                  <span className="d">{d.answer.split(". ")[0]}.</span>
                  <span className="arr"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Ribbon />

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <h2>Or from what you need</h2>
            <Link className="btn ghost" href="/services/">All services</Link>
          </div>
          <div className="index">
            {serviceGroups.map((g) => (
              <div key={g}>
                <h3>{g}</h3>
                <ul>
                  {services.filter((s) => s.group === g).map((s) => (
                    <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band dark">
        <div className="wrap">
          <div className="section-head">
            <h2>How it works</h2>
            <p>Fixed quote after the first call. Nothing is filed until you have read it and signed.</p>
          </div>
          <Steps />
        </div>
      </section>

      <section className="band">
        <div className="wrap split">
          <div>
            <h2 style={{ marginBottom: 18 }}>Dates for the 2026 tax year</h2>
            <p className="lede" style={{ marginBottom: 26 }}>Living abroad moves your filing date, not your payment date. Tax owed is still due on April 15.</p>
            <Link className="btn ghost" href="/resources/deadlines/">Full deadline calendar</Link>
          </div>
          <Deadlines limit={6} />
        </div>
      </section>

      <section className="band stone">
        <div className="wrap split">
          <h2>Questions Americans abroad ask first</h2>
          <Faq items={generalFaqs.slice(0, 6) as [string, string][]} />
        </div>
      </section>
    </>
  );
}
