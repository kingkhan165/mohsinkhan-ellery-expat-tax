import Link from "next/link";
import Crumbs from "@/components/Crumbs";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Contact Us", description: "Book a consultation, request a quote or email our US expat tax team.", path: "/contact/" });

export default function Contact() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Contact", path: "/contact/" }]} />
      <header className="page-head">
        <h1>Contact us</h1>
        <p className="lede">We work with clients in every time zone, entirely online.</p>
      </header>
      <ul className="tiles">
        <li><Link href="/contact/book/"><span className="tt">Book a consultation</span><span className="td">A free 30-minute video call. The fastest way to know what you need.</span></Link></li>
        <li><Link href="/contact/quote/"><span className="tt">Request a quote</span><span className="td">Estimate your fee online, then confirm it on a call.</span></Link></li>
        <li><a href={`mailto:${site.email}`}><span className="tt">Email the team</span><span className="td">{site.email}. Replies within one business day.</span></a></li>
      </ul>
    </div>
  );
}
