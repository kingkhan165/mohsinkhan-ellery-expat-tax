import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap band">
      <h1 style={{ marginBottom: 20 }}>This page isn't on file</h1>
      <p className="lede" style={{ marginBottom: 28 }}>The address may have changed. Start from the services or form guides instead.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="btn" href="/services/">Browse services</Link>
        <Link className="btn ghost" href="/forms/">Form guides</Link>
      </div>
    </div>
  );
}
