import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "About Us", description: "A US tax firm that works only with Americans abroad: how we work, who prepares your return and what we promise.", path: "/about/" });

const promises = [
  ["One specialist from start to finish", "The person on your first call is the person who prepares and reviews your return."],
  ["A fixed fee before work starts", "No hourly billing and no surprise invoices after filing."],
  ["Nothing filed without your sign-off", "You read every return and form first, with notes on each choice we made."],
  ["Reminders before every deadline", "June 15, October 15 and your FBAR date, sent well ahead."],
];

export default function About() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "About us", path: "/about/" }]} />
      <header className="page-head">
        <h1>A tax firm for Americans who live somewhere else</h1>
      </header>
      <div className="split">
        <div className="prose">
          <p>US tax law follows citizens and green card holders wherever they go. Most firms treat expats as an edge case. We don't do anything else.</p>
          <p>Our work is organised into divisions by situation, so the specialist who handles your return files for people in your position every week, whether you are catching up on missed years, running a company abroad or planning to renounce.</p>
          <p className="small" style={{ marginTop: 28 }}>Demo content: team profiles with credentials (CPA, EA) and editorial review details belong on this page in the live site.</p>
        </div>
        <div>
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>What we promise</h2>
          <div className="faq">
            {promises.map(([t, d]) => (
              <div key={t} style={{ padding: "18px 0", borderBottom: "1px solid var(--stone)" }}>
                <h3 style={{ marginBottom: 6 }}>{t}</h3>
                <p style={{ fontFamily: "var(--serif)" }}>{d}</p>
              </div>
            ))}
          </div>
          <Link className="btn" href="/contact/book/" style={{ marginTop: 28 }}>Book a consultation</Link>
        </div>
      </div>
    </div>
  );
}
