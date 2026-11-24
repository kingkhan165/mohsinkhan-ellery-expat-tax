import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import { countries } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "US Taxes by Country of Residence",
  description: "US tax guides for Americans in Canada, the UK, Germany, France, Australia, Israel, Japan, the UAE, Singapore and more: treaties, pensions and local deadlines.",
  path: "/countries/",
});

export default function CountriesHub() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Countries", path: "/countries/" }]} />
      <header className="page-head">
        <h1>US taxes, country by country</h1>
        <p className="lede">The treaty, the totalization agreement, how local pensions are treated and the fund traps to watch for.</p>
      </header>
      <table className="facts stack">
        <thead><tr><th>Country</th><th>Income tax treaty</th><th>Totalization agreement</th><th>Local deadline</th></tr></thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c.slug}>
              <td data-l="Country"><Link className="ulink" href={`/countries/${c.slug}/`}><b>{c.name.replace(/^the /, "")}</b></Link></td>
              <td data-l="Treaty">{c.treaty ? "Yes" : "No"}</td>
              <td data-l="Totalization">{c.totalization ? "Yes" : "No"}</td>
              <td data-l="Local deadline">{c.localDeadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
