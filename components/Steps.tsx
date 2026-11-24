"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

const steps = [
  ["Book a call", "Pick a 30-minute slot. We go through where you live, what you earn and what you hold."],
  ["Upload your documents", "A checklist made for your situation, and one secure place to send everything."],
  ["Review your draft", "You see every return and form before it is filed, with notes on each choice we made."],
  ["We file", "E-filed with the IRS and FinCEN. You get copies, confirmations and next year's dates."],
];

export default function Steps() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <ol className="steps" ref={ref}>
      <div className="steps-track" aria-hidden="true">
        <motion.div className="steps-fill" style={reduce ? { scale: 1 } : { scaleX: p, scaleY: p }} />
      </div>
      {steps.map(([t, d], i) => (
        <li key={t}>
          <span className="n">Step {i + 1}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </li>
      ))}
    </ol>
  );
}
