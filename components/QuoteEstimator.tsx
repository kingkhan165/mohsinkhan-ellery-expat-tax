"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { pricing, addOns } from "@/lib/content";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function QuoteEstimator() {
  const [pkg, setPkg] = useState(0);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [shown, setShown] = useState(pricing[0].price);
  const prev = useRef(pricing[0].price);
  const reduce = useReducedMotion();

  const total = pricing[pkg].price + addOns.reduce((s, a) => s + a.price * (qty[a.key] ?? 0), 0);

  useEffect(() => {
    if (reduce) { setShown(total); prev.current = total; return; }
    const c = animate(prev.current, total, { duration: 0.5, ease: [0.22, 1, 0.36, 1], onUpdate: setShown });
    prev.current = total;
    return () => c.stop();
  }, [total, reduce]);

  const bump = (k: string, d: number) => setQty((q) => ({ ...q, [k]: Math.max(0, Math.min(20, (q[k] ?? 0) + d)) }));

  return (
    <div className="quote-grid">
      <div>
        <h2 style={{ fontSize: 24, marginBottom: 14 }}>Your base package</h2>
        <div className="opts" role="radiogroup" aria-label="Package" style={{ marginBottom: 40 }}>
          {pricing.map((p, i) => (
            <button key={p.name} type="button" role="radio" aria-checked={pkg === i} className="opt" onClick={() => setPkg(i)}>
              <b>{p.name}</b><span>{usd(p.price)} {p.unit}</span>
            </button>
          ))}
        </div>
        <h2 style={{ fontSize: 24, marginBottom: 6 }}>Anything else?</h2>
        <div style={{ borderTop: "1.5px solid var(--ink)" }}>
          {addOns.map((a) => (
            <div className="addon" key={a.key}>
              <span className="lbl">{a.label}<small>{usd(a.price)} each</small></span>
              <span className="stepper">
                <button type="button" aria-label={`Remove one: ${a.label}`} onClick={() => bump(a.key, -1)}>−</button>
                <output aria-live="polite">{qty[a.key] ?? 0}</output>
                <button type="button" aria-label={`Add one: ${a.label}`} onClick={() => bump(a.key, 1)}>+</button>
              </span>
            </div>
          ))}
        </div>
      </div>
      <aside className="aside total" aria-live="polite">
        <h2>Estimated fee</h2>
        <div className="num">{usd(shown)}</div>
        <p>{pricing[pkg].name}{Object.values(qty).some(Boolean) ? " plus extras" : ""}. Sample pricing for this demo; your fixed quote follows the consultation.</p>
        <Link className="btn" href="/contact/book/">Book a consultation</Link>
        <button type="button" className="alt ulink" style={{ background: "none", border: 0, font: "inherit", cursor: "pointer", width: "100%" }} onClick={() => { setPkg(0); setQty({}); }}>Reset the estimate</button>
      </aside>
    </div>
  );
}
