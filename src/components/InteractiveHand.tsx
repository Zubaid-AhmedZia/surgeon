"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function InteractiveHand() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <div className="mt-10">
      <div className="text-xs text-porcelain/60 mb-2">Tap to reveal anatomy</div>
      <button onClick={toggle} className="group relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
        <Image
          src="https://www.yourplasticsurgeryguide.com/wp-content/uploads/2019/03/nice-hands.jpg"
          alt="Hand"
          fill
          className="object-cover"
          unoptimized
          sizes="(min-width: 768px) 400px, 90vw"
        />

        {/* Soft spotlight when open */}
        <motion.div
          initial={false}
          animate={{ opacity: open ? 0.18 : 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(600px 400px at 60% 35%, #ffffff, transparent)" }}
        />

        <AnimatePresence>
          {open && (
            <motion.svg
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
              viewBox="0 0 400 500"
              aria-hidden
            >
              {/* Stylized bones (simplified) */}
              <motion.path
                d="M200 440 L200 140"
                stroke="#e8f1ff"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              {[120, 170, 230, 280, 330].map((x, i) => (
                <motion.path
                  key={i}
                  d={`M${x} ${i<2?220:240} Q ${x-8} ${i<2?180:200}, ${x-10} ${i<2?150:170}`}
                  stroke="#e8f1ff"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 + i*0.08, ease: "easeOut" }}
                />
              ))}

              {/* Veins (stylized) */}
              {[180, 210, 240].map((x, j) => (
                <motion.path
                  key={`v-${j}`}
                  d={`M${x} 420 Q ${x-20} 360, ${x-10} 300 T ${x-20} 220`}
                  stroke="#3fb7ff"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9 + j*0.1, ease: "easeOut" }}
                  style={{ mixBlendMode: "screen" as any }}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

