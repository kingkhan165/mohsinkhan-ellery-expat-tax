import Link from "next/link";
import { countries } from "@/lib/content";

export default function Ribbon() {
  const items = [...countries, ...countries];
  return (
    <div className="ribbon">
      <div className="ribbon-track">
        {items.map((c, i) => (
          <Link key={`${c.slug}-${i}`} href={`/countries/${c.slug}/`} tabIndex={i >= countries.length ? -1 : 0} aria-hidden={i >= countries.length ? true : undefined}>
            {c.name.replace(/^the /, "")}
            <small>{c.treaty ? "Tax treaty" : "No treaty"}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
