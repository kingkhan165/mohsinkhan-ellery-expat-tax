import Crumbs from "@/components/Crumbs";
import QuoteEstimator from "@/components/QuoteEstimator";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Request a Quote",
  description: "Estimate the fee for your US expat tax return, FBAR, Streamlined filing or foreign company reporting, then book a call for a fixed quote.",
  path: "/contact/quote/",
});

export default function QuotePage() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Contact", path: "/contact/" }, { name: "Request a quote", path: "/contact/quote/" }]} />
      <header className="page-head" style={{ paddingBottom: 32 }}>
        <h1>Estimate your fee</h1>
        <p className="lede">Choose a package and add what applies. The estimate updates as you go; the fixed quote comes after a short call.</p>
      </header>
      <QuoteEstimator />
    </div>
  );
}
