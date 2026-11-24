import Link from "next/link";

export default function CtaAside({ topic, heading, text }: { topic?: string; heading?: string; text?: string }) {
  const href = topic ? `/contact/book/?topic=${topic}` : "/contact/book/";
  return (
    <aside className="aside">
      <h2>{heading ?? "Talk it through with a specialist"}</h2>
      <p>{text ?? "A 30-minute video call. We tell you what needs filing and send a fixed quote before any work starts."}</p>
      <Link className="btn" href={href}>Book a consultation</Link>
      <Link className="alt ulink" href="/contact/quote/">Or estimate your fee first</Link>
    </aside>
  );
}
