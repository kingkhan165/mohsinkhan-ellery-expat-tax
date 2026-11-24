"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { countries } from "@/lib/content";

const topics = [
  { k: "annual", t: "Yearly expat return", d: "Form 1040, FBAR, FATCA", svcs: ["expat-tax-returns", "fbar", "fatca", "feie-ftc", "state-tax"] },
  { k: "catchup", t: "Catching up on past years", d: "Streamlined, late FBARs, amended returns", svcs: ["streamlined-filing", "delinquent-submissions", "amended-returns"] },
  { k: "investments", t: "Pensions, funds and property", d: "PFICs, foreign pensions, rentals, equity pay", svcs: ["foreign-pensions", "pfic", "foreign-property", "equity-compensation", "tax-treaties"] },
  { k: "business", t: "Business or foreign company", d: "Self-employment, Form 5471, CFC income", svcs: ["foreign-entities", "gilti", "totalization"] },
  { k: "family", t: "Family, trusts and gifts", d: "Non-US spouse, foreign gifts, estate tax", svcs: ["non-us-spouse", "foreign-trusts-gifts", "gift-estate-tax"] },
  { k: "move", t: "Moving abroad or back", d: "Dual-status year, leaving your state", svcs: ["relocation"] },
  { k: "renounce", t: "Renouncing citizenship", d: "Form 8854 and exit tax", svcs: ["expatriation"] },
  { k: "irs", t: "An IRS letter or something else", d: "Notices, planning, other questions", svcs: ["irs-representation", "tax-planning"] },
];
const stepNames = ["Topic", "Date & time", "Your details", "Confirm"];

type Slot = { iso: string; free: boolean };
type Day = { key: string; date: Date; slots: Slot[] };

// Deterministic "availability" so the demo calendar looks lived-in and stable.
const busy = (seed: string) => { let h = 0; for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h % 100 < 34; };

function buildDays(now: Date): Day[] {
  const days: Day[] = [];
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  while (days.length < 15) {
    const wd = d.getUTCDay();
    if (wd !== 0 && wd !== 6) {
      const key = d.toISOString().slice(0, 10);
      const slots: Slot[] = [];
      for (let m = 13 * 60; m <= 20 * 60 + 30; m += 30) {
        const t = new Date(d.getTime() + m * 60000);
        slots.push({ iso: t.toISOString(), free: !busy(key + m) });
      }
      days.push({ key, date: new Date(d), slots });
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return days;
}

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

export default function BookingFlow() {
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [topic, setTopic] = useState<string | null>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [tz, setTz] = useState("your time zone");
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [f, setF] = useState({ name: "", email: "", country: "", status: "", notes: "", consent: false });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = box.current;
    if (el && el.getBoundingClientRect().top < 90) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: reduce ? "auto" : "smooth" });
  }, [step, reduce]);

  useEffect(() => {
    const ds = buildDays(new Date());
    setDays(ds);
    setDay(ds[0]?.key ?? null);
    try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ")); } catch {}
    const q = params.get("topic");
    const match = topics.find((t) => t.svcs.includes(q ?? ""));
    if (match) setTopic(match.k);
  }, [params]);

  const dayObj = days.find((d) => d.key === day);
  const tFmt = useMemo(() => new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }), []);
  const longFmt = useMemo(() => new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }), []);

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !topic) e.topic = "Choose a topic to continue.";
    if (s === 1 && !slot) e.slot = "Choose a time to continue.";
    if (s === 2) {
      if (f.name.trim().length < 2) e.name = "Enter your full name.";
      if (!emailOk(f.email)) e.email = "Enter an email address like name@example.com.";
      if (!f.country) e.country = "Choose the country you live in.";
      if (!f.status) e.status = "Choose your US status.";
      if (!f.consent) e.consent = "Tick the box so we can contact you about this call.";
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  };
  const go = (to: number) => { if (to > step && !validate(step)) return; setErrs({}); setDir(to > step ? 1 : -1); setStep(to); };

  const submit = async () => {
    setSending(true);
    // Production: POST this booking to /api/book (Cal.com, HubSpot or email via Resend).
    await new Promise((r) => setTimeout(r, 900));
    setRef("EL-" + Math.random().toString(36).slice(2, 7).toUpperCase());
    setSending(false);
    setDir(1);
    setStep(4);
  };

  const ics = () => {
    if (!slot) return;
    const s = new Date(slot), e = new Date(s.getTime() + 30 * 60000);
    const z = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ellery Expat Tax//Booking//EN", "BEGIN:VEVENT", `UID:${ref}@ellery`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(s)}`, `DTEND:${z(e)}`, "SUMMARY:US expat tax consultation", "DESCRIPTION:Video link will be emailed before the call.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    const a = document.createElement("a"); a.href = url; a.download = "consultation.ics"; a.click(); URL.revokeObjectURL(url);
  };

  const t = topics.find((x) => x.k === topic);
  const variants = {
    in: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 40 }),
    on: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
    out: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -40, transition: { duration: 0.2 } }),
  };

  return (
    <div className="flow" ref={box}>
      <ol className="progress" aria-label="Booking progress">
        {stepNames.map((n, i) => (
          <li key={n} className={i < step ? "done" : i === step ? "cur" : undefined} aria-current={i === step ? "step" : undefined}>
            {i + 1}<span className="lbl">. {n}</span><span className="bar" />
          </li>
        ))}
      </ol>
      <div className="flow-body">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir} variants={variants} initial="in" animate="on" exit="out">
            {step === 0 && (
              <>
                <h2>What would you like to talk about?</h2>
                <p className="sub">Pick the closest match. You can add detail later.</p>
                <div className="opts" role="radiogroup" aria-label="Topic">
                  {topics.map((x) => (
                    <button key={x.k} type="button" role="radio" aria-checked={topic === x.k} className="opt" onClick={() => { setTopic(x.k); setErrs({}); }}>
                      <b>{x.t}</b><span>{x.d}</span>
                    </button>
                  ))}
                </div>
                {errs.topic && <p className="field"><span className="err">{errs.topic}</span></p>}
              </>
            )}
            {step === 1 && (
              <>
                <h2>Choose a time</h2>
                <p className="sub">30-minute video call. Times are shown in {tz}.</p>
                <div className="days" role="group" aria-label="Day">
                  {days.map((d) => (
                    <button key={d.key} type="button" className="day" aria-pressed={day === d.key} onClick={() => { setDay(d.key); setSlot(null); }}>
                      <small>{d.date.toLocaleDateString(undefined, { weekday: "short", timeZone: "UTC" })}</small>
                      <b>{d.date.getUTCDate()}</b>
                      <small>{d.date.toLocaleDateString(undefined, { month: "short", timeZone: "UTC" })}</small>
                    </button>
                  ))}
                </div>
                <div className="times" role="group" aria-label="Time">
                  {dayObj?.slots.map((s) => (
                    <button key={s.iso} type="button" className="time" disabled={!s.free} aria-pressed={slot === s.iso} onClick={() => { setSlot(s.iso); setErrs({}); }}>
                      {tFmt.format(new Date(s.iso))}
                    </button>
                  ))}
                </div>
                {errs.slot && <p className="field" style={{ marginTop: 14 }}><span className="err">{errs.slot}</span></p>}
              </>
            )}
            {step === 2 && (
              <>
                <h2>Your details</h2>
                <p className="sub">We use these to prepare for the call. Nothing is shared outside the firm.</p>
                <div className="fields">
                  <div className={`field${errs.name ? " bad" : ""}`}>
                    <label htmlFor="bk-name">Full name</label>
                    <input id="bk-name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-invalid={!!errs.name} aria-describedby={errs.name ? "e-name" : undefined} />
                    {errs.name && <span className="err" id="e-name">{errs.name}</span>}
                  </div>
                  <div className={`field${errs.email ? " bad" : ""}`}>
                    <label htmlFor="bk-email">Email</label>
                    <input id="bk-email" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} aria-invalid={!!errs.email} aria-describedby={errs.email ? "e-email" : undefined} />
                    {errs.email && <span className="err" id="e-email">{errs.email}</span>}
                  </div>
                  <div className={`field${errs.country ? " bad" : ""}`}>
                    <label htmlFor="bk-country">Country you live in</label>
                    <select id="bk-country" value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} aria-invalid={!!errs.country}>
                      <option value="">Choose a country</option>
                      {countries.map((c) => <option key={c.slug} value={c.name.replace(/^the /, "")}>{c.name.replace(/^the /, "")}</option>)}
                      <option value="Other">Somewhere else</option>
                    </select>
                    {errs.country && <span className="err">{errs.country}</span>}
                  </div>
                  <div className={`field${errs.status ? " bad" : ""}`}>
                    <label htmlFor="bk-status">US status</label>
                    <select id="bk-status" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} aria-invalid={!!errs.status}>
                      <option value="">Choose one</option>
                      <option>US citizen</option>
                      <option>Green card holder</option>
                      <option>Dual citizen</option>
                      <option>Not sure</option>
                    </select>
                    {errs.status && <span className="err">{errs.status}</span>}
                  </div>
                  <div className="field full">
                    <label htmlFor="bk-notes">Anything we should know first? (optional)</label>
                    <textarea id="bk-notes" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="For example: haven't filed since 2021, own a UK company, two foreign pensions." />
                  </div>
                  <div className="field full">
                    <label className="consent">
                      <input type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} />
                      <span>You can email me about this consultation. See the <Link className="ulink" href="/privacy/">privacy policy</Link>.</span>
                    </label>
                    {errs.consent && <span className="err">{errs.consent}</span>}
                  </div>
                </div>
              </>
            )}
            {step === 3 && slot && (
              <>
                <h2>Check and confirm</h2>
                <p className="sub">You can change anything before you confirm.</p>
                <dl className="summary">
                  <div><dt>Topic</dt><dd>{t?.t} <button className="ulink" style={{ background: "none", border: 0, font: "inherit", cursor: "pointer", marginLeft: 8 }} onClick={() => go(0)}>Change</button></dd></div>
                  <div><dt>When</dt><dd>{longFmt.format(new Date(slot))} <button className="ulink" style={{ background: "none", border: 0, font: "inherit", cursor: "pointer", marginLeft: 8 }} onClick={() => go(1)}>Change</button></dd></div>
                  <div><dt>Name</dt><dd>{f.name}</dd></div>
                  <div><dt>Email</dt><dd>{f.email}</dd></div>
                  <div><dt>Lives in</dt><dd>{f.country}, {f.status.toLowerCase()}</dd></div>
                  {f.notes && <div><dt>Notes</dt><dd>{f.notes}</dd></div>}
                </dl>
                <p className="small">The consultation is free. If we can help, you get a fixed quote by email within one business day.</p>
              </>
            )}
            {step === 4 && slot && (
              <div className="confirm">
                <div className="tick"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 17l7 7 13-15" /></svg></div>
                <h2>Consultation booked</h2>
                <p className="lede" style={{ margin: "10px 0 22px" }}>{longFmt.format(new Date(slot))}. A calendar invite and video link are on their way to {f.email}.</p>
                <dl className="summary">
                  <div><dt>Reference</dt><dd><b>{ref}</b></dd></div>
                  <div><dt>Topic</dt><dd>{t?.t}</dd></div>
                </dl>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button className="btn" onClick={ics}>Add to calendar</button>
                  <Link className="btn ghost" href="/resources/deadlines/">See your deadlines</Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {step < 4 && (
        <div className="flow-nav">
          {step > 0 ? <button className="btn ghost" onClick={() => go(step - 1)}>Back</button> : <span className="small">Free 30-minute call</span>}
          {step < 3 ? (
            <button className="btn" onClick={() => go(step + 1)}>Continue</button>
          ) : (
            <button className="btn" onClick={submit} disabled={sending}>{sending ? <><span className="spinner" /> Booking</> : "Confirm booking"}</button>
          )}
        </div>
      )}
    </div>
  );
}
