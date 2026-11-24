"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { site } from "@/lib/site";
import { services, serviceGroups, forms, formGroups, divisions, countries } from "@/lib/content";

type Group = { title: string; links: { href: string; label: string }[] };
type Panel = { key: string; label: string; href: string; intro: string; groups: Group[] };

const panels: Panel[] = [
  {
    key: "services", label: "Services", href: "/services/",
    intro: "Everything from the yearly return to catch-up filings, treaty positions and exit tax.",
    groups: serviceGroups.map((g) => ({ title: g, links: services.filter((s) => s.group === g).map((s) => ({ href: `/services/${s.slug}/`, label: s.title })) })),
  },
  {
    key: "forms", label: "Forms", href: "/forms/",
    intro: "Plain-English guides to the 30 IRS and FinCEN forms Americans abroad meet most.",
    groups: formGroups.map((g) => ({ title: g, links: forms.filter((f) => f.group === g).map((f) => ({ href: `/forms/${f.slug}/`, label: f.code })) })),
  },
  {
    key: "divisions", label: "Who we help", href: "/divisions/",
    intro: "Start from your situation and we'll show you the services that apply.",
    groups: [{ title: "Divisions", links: divisions.map((d) => ({ href: `/divisions/${d.slug}/`, label: d.title })) }],
  },
  {
    key: "countries", label: "Countries", href: "/countries/",
    intro: "Treaties, pensions, local deadlines and fund traps, country by country.",
    groups: [
      { title: "Americas & Middle East", links: countries.filter((c) => ["canada", "mexico", "israel", "uae"].includes(c.slug)).map((c) => ({ href: `/countries/${c.slug}/`, label: c.name.replace(/^the /, "") })) },
      { title: "Europe", links: countries.filter((c) => ["uk", "germany", "france", "spain", "italy", "netherlands", "switzerland", "ireland", "portugal"].includes(c.slug)).map((c) => ({ href: `/countries/${c.slug}/`, label: c.name.replace(/^the /, "") })) },
      { title: "Asia-Pacific", links: countries.filter((c) => ["australia", "japan", "singapore"].includes(c.slug)).map((c) => ({ href: `/countries/${c.slug}/`, label: c.name })) },
    ],
  },
];

const Chev = () => (
  <svg className="chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
);

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setOpen(null); setDrawer(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setDrawer(false); } };
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);
  useEffect(() => { document.body.style.overflow = drawer ? "hidden" : ""; }, [drawer]);

  const hoverOpen = (k: string) => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(k), 90); };
  const hoverClose = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 180); };

  return (
    <header ref={ref} className={`hdr${scrolled || open ? " scrolled" : ""}`}>
      <a className="skip" href="#main">Skip to content</a>
      <div className="wrap hdr-row">
        <Link className="logo" href="/" aria-label={`${site.name} home`}>
          <Logo />
          <span>{site.name}</span>
        </Link>
        <nav className="mainnav" aria-label="Main">
          {panels.map((p) => (
            <div key={p.key} onMouseEnter={() => hoverOpen(p.key)} onMouseLeave={hoverClose}>
              <button
                className="navbtn"
                aria-expanded={open === p.key}
                aria-controls={`mega-${p.key}`}
                onClick={() => setOpen(open === p.key ? null : p.key)}
              >
                {p.label}<Chev />
              </button>
              <div id={`mega-${p.key}`} className={`mega${open === p.key ? " open" : ""}`} onMouseEnter={() => hoverOpen(p.key)} onMouseLeave={hoverClose}>
                <div className="mega-in">
                  <div className="mega-intro">
                    <h2 style={{ fontSize: 30 }}>{p.label}</h2>
                    <p>{p.intro}</p>
                    <Link className="btn ghost" href={p.href} tabIndex={open === p.key ? 0 : -1}>See all {p.label.toLowerCase()}</Link>
                  </div>
                  <div className="mega-cols">
                    {p.groups.map((g) => (
                      <div className="mega-group" key={g.title}>
                        <h3>{g.title}</h3>
                        {g.links.map((l) => <Link key={l.href} href={l.href} tabIndex={open === p.key ? 0 : -1}>{l.label}</Link>)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div><Link className="navbtn" href="/pricing/">Pricing</Link></div>
          <div><Link className="navbtn" href="/resources/">Resources</Link></div>
        </nav>
        <Link className="btn hdr-cta" href="/contact/book/">Book a consultation</Link>
        <button className="burger" aria-label="Menu" aria-expanded={drawer} aria-controls="drawer" onClick={() => setDrawer(!drawer)}>
          <span /><span /><span />
        </button>
      </div>
      <div id="drawer" className={`drawer${drawer ? " open" : ""}`} aria-hidden={!drawer}>
        {panels.map((p) => (
          <details key={p.key}>
            <summary>{p.label}<Chev /></summary>
            <div>
              <Link href={p.href}><b>All {p.label.toLowerCase()}</b></Link>
              {p.groups.flatMap((g) => g.links).map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </div>
          </details>
        ))}
        <Link href="/pricing/">Pricing</Link>
        <Link href="/resources/">Resources</Link>
        <Link href="/contact/">Contact</Link>
        <Link className="btn" href="/contact/book/">Book a consultation</Link>
      </div>
    </header>
  );
}
