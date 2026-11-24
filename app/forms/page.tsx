import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import { forms, formGroups } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "IRS & FinCEN Forms for US Expats",
  description: "Plain-English guides to the 30 forms Americans abroad file most: Form 1040, 2555, 1116, FBAR, 8938, 8621, 5471, 3520, 8854 and more.",
  path: "/forms/",
});

export default function FormsHub() {
  return (
    <div className="wrap">
      <Crumbs items={[{ name: "Forms", path: "/forms/" }]} />
      <header className="page-head">
        <h1>Forms Americans abroad file</h1>
        <p className="lede">What each form is for, who files it and when it is due. Every guide links to the service where we prepare it.</p>
      </header>
      <div className="index" style={{ paddingBottom: 96 }}>
        {formGroups.map((g) => (
          <div key={g}>
            <h3>{g}</h3>
            <ul>
              {forms.filter((f) => f.group === g).map((f) => (
                <li key={f.slug}><Link href={`/forms/${f.slug}/`}><span className="code">{f.code}</span>{f.name.replace(/ \(FBAR\)$/, "")}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
