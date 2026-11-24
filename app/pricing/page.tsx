import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import Faq from "@/components/Faq";
import { pricing, addOns } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Pricing", description: "Fixed fees for US expat tax returns, FBARs, Streamlined catch-up filings and business owner packages.", path: "/pricing/" });

export default function Pricing() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Pricing", path: "/pricing/" }]} />
      <header className="page-head">
        <h1>Fixed fees, agreed before we start</h1>
        <p className="lede">Most clients fit one of three packages. Extras are priced per item so you only pay for what applies. Sample pricing for this demo.</p>
      </header>
      <div className="price-cols">
        {pricing.map((p) => (
          <div key={p.name}>
            <h2 style={{ fontSize: 24 }}>{p.name}</h2>
            <div className="amt">${p.price.toLocaleString("en-US")}</div>
            <span className="small">{p.unit}</span>
            <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
            <Link className="btn" href="/contact/book/">Book a consultation</Link>
          </div>
        ))}
      </div>
      <div className="split" style={{ marginTop: 80 }}>
        <div>
          <h2 style={{ marginBottom: 14 }}>Extras</h2>
          <p className="lede" style={{ marginBottom: 22 }}>Added to any package.</p>
          <Link className="btn ghost" href="/contact/quote/">Estimate your fee</Link>
        </div>
        <table className="facts">
          <tbody>{addOns.map((a) => <tr key={a.key}><th scope="row" style={{ fontWeight: 500, width: "auto" }}>{a.label}</th><td style={{ textAlign: "right", fontWeight: 600 }}>${a.price}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="split" style={{ marginTop: 80 }}>
        <h2>About our fees</h2>
        <Faq items={[
          ["Is the first consultation free?", "Yes. The 30-minute call is free and you get a fixed quote afterwards."],
          ["What if my situation turns out more complex?", "If we find something new, such as an extra fund or a company, we price it before doing the work. Nothing is added without your agreement."],
          ["Do you charge for extensions?", "No. Filing Form 4868 is included in every package."],
        ]} />
      </div>
    </div>
  );
}
