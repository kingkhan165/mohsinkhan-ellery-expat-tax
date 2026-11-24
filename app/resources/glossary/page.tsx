import Crumbs from "@/components/Crumbs";
import JsonLd from "@/components/JsonLd";
import { glossary } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "US Expat Tax Glossary", description: "Plain-English definitions of FBAR, FATCA, FEIE, PFIC, totalization, the saving clause, covered expatriate and more.", path: "/resources/glossary/" });

export default function Glossary() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Resources", path: "/resources/" }, { name: "Glossary", path: "/resources/glossary/" }]} />
      <header className="page-head"><h1>Glossary</h1></header>
      <dl className="summary" style={{ maxWidth: 900 }}>
        {glossary.map(([t, d]) => <div key={t} id={t.toLowerCase().replace(/\W+/g, "-")}><dt>{t}</dt><dd style={{ fontFamily: "var(--serif)", fontSize: 17 }}>{d}</dd></div>)}
      </dl>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "DefinedTermSet", name: `${site.name} glossary`, hasDefinedTerm: glossary.map(([name, description]) => ({ "@type": "DefinedTerm", name, description })) }} />
    </div>
  );
}
