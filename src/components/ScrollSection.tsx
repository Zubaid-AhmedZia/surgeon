"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScrollSection({
  title, children, kicker,
}: { title: string; kicker?: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4">
          {kicker && <div className="text-vein/70 uppercase tracking-wider text-sm mb-2">{kicker}</div>}
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .7 }}
            className="font-display text-3xl md:text-5xl"
          >{title}</motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .7, delay: .1 }}
          className="md:col-span-8 text-porcelain/85 leading-relaxed"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

