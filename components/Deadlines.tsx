"use client";
import { useEffect, useState } from "react";
import { deadlines } from "@/lib/content";

const fmt = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export default function Deadlines({ limit }: { limit?: number }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(Date.now()), []);
  const list = limit ? deadlines.slice(0, limit) : deadlines;
  const nextIdx = today === null ? -1 : list.findIndex((d) => new Date(d.date + "T23:59:59Z").getTime() >= today);
  return (
    <ul className="cal">
      {list.map((d, i) => {
        const days = today === null ? null : Math.ceil((new Date(d.date + "T23:59:59Z").getTime() - today) / 86400000);
        return (
          <li key={d.date} className={i === nextIdx ? "next" : undefined}>
            <time dateTime={d.date}>{fmt(d.date)}, {d.date.slice(0, 4)}</time>
            <span>{d.label}</span>
            <span className="in">{days === null ? "" : days < 0 ? "Passed" : days === 0 ? "Today" : `In ${days} days`}</span>
          </li>
        );
      })}
    </ul>
  );
}
