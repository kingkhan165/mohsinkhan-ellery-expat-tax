import JsonLd from "./JsonLd";
import { faqLd } from "@/lib/seo";

export default function Faq({ items, schema = true }: { items: [string, string][]; schema?: boolean }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            <span>{q}</span>
            <span className="pm" aria-hidden="true" />
          </summary>
          <p className="ans">{a}</p>
        </details>
      ))}
      {schema && <JsonLd data={faqLd(items)} />}
    </div>
  );
}
