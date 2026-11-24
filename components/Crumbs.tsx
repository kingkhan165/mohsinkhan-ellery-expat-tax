import Link from "next/link";
import JsonLd from "./JsonLd";
import { crumbLd } from "@/lib/seo";

export default function Crumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="crumbs">
          {all.map((c, i) => (
            <li key={c.path}>
              {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={crumbLd(all)} />
    </>
  );
}
