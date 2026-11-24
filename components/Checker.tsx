"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getForm } from "@/lib/content";

type A = Record<string, string | string[] | undefined>;

const Tick = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 6.5l3 3 6-7" /></svg>
);

const lines: { id: string; q: string; opts: [string, string][]; multi?: boolean }[] = [
  { id: "status", q: "Are you a US citizen or green card holder?", opts: [["citizen", "Citizen"], ["gc", "Green card"], ["neither", "Neither"]] },
  { id: "income", q: "Was your 2026 income above $16,100 ($32,200 joint), or $400 from self-employment?", opts: [["yes", "Yes"], ["no", "No"]] },
  { id: "fbar", q: "Did your foreign accounts together pass $10,000 at any time in the year?", opts: [["yes", "Yes"], ["no", "No"]] },
  { id: "fatca", q: "Foreign assets over $200,000 at year-end, or $300,000 at any point?", opts: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
  { id: "extra", q: "Do any of these apply to you? Tick all that do.", multi: true, opts: [["funds", "Non-US funds or ETFs"], ["company", "Own 10%+ of a foreign company"], ["se", "Self-employed"]] },
  { id: "behind", q: "Have you missed US filings in earlier years?", opts: [["yes", "Yes"], ["no", "No"]] },
];

export default function Checker() {
  const [a, setA] = useState<A>({});
  const reduce = useReducedMotion();

  const set = (id: string, v: string, multi?: boolean) =>
    setA((prev) => {
      if (!multi) return { ...prev, [id]: prev[id] === v ? undefined : v };
      const cur = (prev[id] as string[] | undefined) ?? [];
      return { ...prev, [id]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  const result = useMemo(() => {
    const out: string[] = [];
    if (a.status === "neither") return { out: ["1040-nr"], neither: true };
    if (!a.status) return { out, neither: false };
    const extra = (a.extra as string[] | undefined) ?? [];
    if (a.income === "yes" || extra.includes("se")) out.push("1040");
    if (a.income === "yes") out.push("2555", "1116");
    if (a.fbar === "yes") out.push("fbar", "schedule-b");
    if (a.fatca === "yes" || a.fatca === "unsure") out.push("8938");
    if (extra.includes("funds")) out.push("8621");
    if (extra.includes("company")) out.push("5471", "8992");
    if (extra.includes("se")) out.push("schedule-c-se");
    if (a.behind === "yes") out.push("14653");
    return { out: [...new Set(out)], neither: false };
  }, [a]);

  const answered = Object.values(a).filter((v) => (Array.isArray(v) ? v.length : v)).length;
  const showStamp = result.out.length > 0 && !result.neither;
  const stampKey = a.behind === "yes" ? "catch" : "due";

  return (
    <section className="sheet" aria-labelledby="checker-title">
      <div className="sheet-head">
        <div className="formno">Form E-1<span>Filing check</span></div>
        <h2 id="checker-title">What do I need to file this year?</h2>
        <div className="yr" aria-label="Tax year 2026">2026</div>
      </div>
      <ol className="lines">
        {lines.map((l, i) => (
          <li className="line" key={l.id}>
            <span className="no" aria-hidden="true">{i + 1}</span>
            <div className="q" role="group" aria-label={l.q}>
              <span>{l.q}</span>
              <div className="choices">
                {l.opts.map(([v, label]) => {
                  const on = l.multi ? ((a[l.id] as string[] | undefined) ?? []).includes(v) : a[l.id] === v;
                  const dim = l.id !== "status" && a.status === "neither";
                  return (
                    <button key={v} type="button" className="box" aria-pressed={on} disabled={dim} style={dim ? { opacity: 0.35 } : undefined} onClick={() => set(l.id, v, l.multi)}>
                      <span className="sq"><Tick /></span>{label}
                    </button>
                  );
                })}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="sheet-out out-wrap" aria-live="polite">
        <div>
        <h3>{result.out.length ? (result.neither ? "You probably only file if you have US income" : `Forms that apply to you (${result.out.length})`) : "Your forms will appear here"}</h3>
        {result.out.length === 0 ? (
          <p className="empty">Tick the boxes above. Each answer adds the forms that go with it, linked to a plain-English guide.</p>
        ) : (
          <ul className="out-list">
            <AnimatePresence initial={false}>
              {result.out.map((slug, i) => {
                const f = getForm(slug)!;
                return (
                  <motion.li
                    key={slug}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: reduce ? 0 : i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <Link href={`/forms/${f.slug}/`}><b>{f.code}</b><span>{f.name.replace(/ \(FBAR\)$/, "")}</span></Link>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
        </div>
        {showStamp && (
          <div className="stamp" key={stampKey} aria-hidden="true">
            {stampKey === "catch" ? <>Catch up first<b>Streamlined</b></> : <>File by<b>June 15, 2027</b></>}
          </div>
        )}
      </div>
      <div className="sheet-foot">
        <span>{answered}/6 lines completed. A quick guide, not advice: some forms depend on details we check on a call.</span>
        {result.out.length > 0 && <Link className="btn" href="/contact/book/">Book a consultation</Link>}
      </div>
    </section>
  );
}
