import { site } from "@/lib/site";
import { services, forms, countries, divisions } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const L = (t: string, p: string, d: string) => `- [${t}](${site.url}${p}): ${d}`;
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Figures are for US tax year 2026 unless stated. Contact: " + site.email,
    "",
    "## Services",
    ...services.map((s) => L(s.title, `/services/${s.slug}/`, s.answer.split(". ")[0] + ".")),
    "",
    "## Who we help",
    ...divisions.map((d) => L(d.title, `/divisions/${d.slug}/`, d.answer.split(". ")[0] + ".")),
    "",
    "## Form guides",
    ...forms.map((f) => L(`${f.code}: ${f.name}`, `/forms/${f.slug}/`, f.purpose.split(". ")[0] + ".")),
    "",
    "## Country guides",
    ...countries.map((c) => L(`US taxes ${c.inName}`, `/countries/${c.slug}/`, `Treaty: ${c.treaty ? "yes" : "no"}. Totalization: ${c.totalization ? "yes" : "no"}. Local deadline: ${c.localDeadline}.`)),
    "",
    "## Optional",
    L("Deadlines", "/resources/deadlines/", "Every US expat deadline for the 2026 tax year."),
    L("Glossary", "/resources/glossary/", "Definitions of expat tax terms."),
    L("Book a consultation", "/contact/book/", "Free 30-minute video call."),
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
