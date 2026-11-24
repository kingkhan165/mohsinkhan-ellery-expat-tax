import Crumbs from "@/components/Crumbs";
import Faq from "@/components/Faq";
import { generalFaqs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "US Expat Tax FAQs", description: "Answers to the questions Americans abroad ask most about filing, deadlines, FBAR, double taxation and catching up on missed years.", path: "/faqs/" });

export default function Faqs() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "FAQs", path: "/faqs/" }]} />
      <header className="page-head"><h1>Frequently asked questions</h1></header>
      <div style={{ maxWidth: 860 }}><Faq items={generalFaqs as [string, string][]} /></div>
    </div>
  );
}
