import Crumbs from "@/components/Crumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Privacy policy", description: "Privacy policy for Ellery Expat Tax.", path: "/privacy/" });

export default function Page() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Privacy policy", path: "/privacy/" }]} />
      <header className="page-head"><h1>Privacy policy</h1></header>
      <div className="prose">
        <p>This page holds the firm's privacy policy. The final text is supplied by the client and reviewed by their legal adviser before launch.</p>
        <p className="small">Demo placeholder.</p>
      </div>
    </div>
  );
}
