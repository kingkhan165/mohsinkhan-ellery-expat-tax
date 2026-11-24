import { Suspense } from "react";
import Crumbs from "@/components/Crumbs";
import BookingFlow from "@/components/BookingFlow";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a Consultation",
  description: "Book a free 30-minute video consultation with a US expat tax specialist. Choose a topic and a time that suits your time zone.",
  path: "/contact/book/",
});

export default function BookPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <Crumbs items={[{ name: "Contact", path: "/contact/" }, { name: "Book a consultation", path: "/contact/book/" }]} />
      <header className="page-head" style={{ paddingBottom: 32 }}>
        <h1>Book a consultation</h1>
        <p className="lede">Thirty minutes, by video, with a specialist. You'll know what to file and what it will cost by the end of the call.</p>
      </header>
      <Suspense fallback={<div className="flow" style={{ minHeight: 520 }} />}>
        <BookingFlow />
      </Suspense>
    </div>
  );
}
