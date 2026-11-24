import Crumbs from "@/components/Crumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms of engagement", description: "Terms of engagement for Ellery Expat Tax.", path: "/terms/" });

export default function Page() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Terms of engagement", path: "/terms/" }]} />
      <header className="page-head"><h1>Terms of engagement</h1></header>
      <div className="prose">
        <p>This page holds the firm's terms of engagement. The final text is supplied by the client and reviewed by their legal adviser before launch.</p>
        <p className="small">Demo placeholder.</p>
      </div>
    </div>
  );
}
