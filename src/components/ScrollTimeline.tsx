"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Step = { title: string; detail?: string };

export default function ScrollTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const height = useTransform(progress, (v) => `${Math.max(6, v * 100)}%`);

  return (
    <div ref={ref} className="relative grid md:grid-cols-12 gap-8 py-10">
      <div className="md:col-span-4">
        <div className="sticky top-24 h-1/2">
          <div className="relative h-full w-1 bg-white/10 rounded">
            <motion.div className="absolute left-0 top-0 w-1 bg-surgical rounded" style={{ height }} />
          </div>
        </div>
      </div>
      <div className="md:col-span-8 space-y-6">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px -10% 0px" }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="font-display text-xl">{s.title}</div>
            {s.detail && <p className="text-porcelain/80 mt-1">{s.detail}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
