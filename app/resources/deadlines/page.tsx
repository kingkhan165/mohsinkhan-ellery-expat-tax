import Crumbs from "@/components/Crumbs";
import Deadlines from "@/components/Deadlines";
import CtaAside from "@/components/CtaAside";
import JsonLd from "@/components/JsonLd";
import { deadlines } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "US Expat Tax Deadlines 2026–2027", description: "Every US tax deadline for Americans abroad for the 2026 tax year: April 15 payment, June 15 expat filing, October 15 extension and FBAR dates.", path: "/resources/deadlines/" });

export default function DeadlinesPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Resources", path: "/resources/" }, { name: "Deadlines", path: "/resources/deadlines/" }]} />
      <header className="page-head">
        <h1>Expat tax deadlines for the 2026 tax year</h1>
        <p className="lede">If you live abroad on April 15, your return is automatically due June 15. Payment is still due April 15.</p>
      </header>
      <div className="split rev">
        <Deadlines />
        <div><CtaAside /></div>
      </div>
      <JsonLd data={deadlines.map((d) => ({ "@context": "https://schema.org", "@type": "Event", name: d.label, startDate: d.date, eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode", location: { "@type": "VirtualLocation", url: "https://www.irs.gov" } }))} />
    </div>
  );
}
