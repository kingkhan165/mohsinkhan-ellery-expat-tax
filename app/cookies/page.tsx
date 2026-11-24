import Crumbs from "@/components/Crumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Cookie policy", description: "Cookie policy for Ellery Expat Tax.", path: "/cookies/" });

export default function Page() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Cookie policy", path: "/cookies/" }]} />
      <header className="page-head"><h1>Cookie policy</h1></header>
      <div className="prose">
        <p>This page holds the firm's cookie policy. The final text is supplied by the client and reviewed by their legal adviser before launch.</p>
        <p className="small">Demo placeholder.</p>
      </div>
    </div>
  );
}
