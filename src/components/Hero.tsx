"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import InteractiveHand3D from "@/components/InteractiveHand3D";
import SketchfabEmbed from "@/components/SketchfabEmbed";

const doctorSrc = "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1640&auto=format&fit=crop";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] px-6 pt-8 md:pt-16 pb-6 overflow-hidden">
      <SurgicalBackground />
      <div className="relative max-w-6xl mx-auto">
        {/* Assembling frame pieces */}
        <FrameAssembler />

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left: content panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 relative z-10"
            style={{ willChange: "transform, opacity" }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.35, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl md:text-7xl leading-[1.05]"
              >
                Dr. Sobia Yasmeen
              </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.35, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-lg md:text-2xl text-porcelain/80"
            >
              Hand & Plastic Surgery — Reconstruction with Precision. Beauty with Restraint.
            </motion.p>

            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "opacity" }}
            >
              <a href="#book" className="rounded-2xl px-6 py-3 bg-surgical text-white hover:brightness-110 transition">
                Book a Consultation
              </a>
              <a href="/cases" className="rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/5 transition">
                See Outcomes
              </a>
            </motion.div>

            {/* Mobile portrait (smaller, above 3D) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-8"
            >
              <div className="relative w-[82%] mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 300px at 70% 20%, rgba(255,255,255,0.08), transparent)" }} />
                <div className="aspect-[4/5] relative">
                  <Image src={doctorSrc} alt="Dr. Sobia Yasmeen" fill priority unoptimized className="object-cover" />
                </div>
              </div>
            </motion.div>

            {/* Interactive anatomy preview (3D) */}
            {process.env.NEXT_PUBLIC_HAND_MODEL_URL ? (
              <InteractiveHand3D />
            ) : (process.env.NEXT_PUBLIC_SKETCHFAB_UID || process.env.NEXT_PUBLIC_SKETCHFAB_URL) ? (
              <SketchfabEmbed uid={process.env.NEXT_PUBLIC_SKETCHFAB_UID} url={process.env.NEXT_PUBLIC_SKETCHFAB_URL} />
            ) : (
              <InteractiveHand3D />
            )}
          </motion.div>

          {/* Right: portrait panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block md:col-span-6 relative"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              initial={{ scale: 0.96, rotate: -1 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.35, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg"
            >
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: "radial-gradient(1200px 400px at 70% 20%, rgba(255,255,255,0.08), transparent)" }} />
              <div className="aspect-[4/5] relative">
                <Image src={doctorSrc} alt="Dr. Sobia Yasmeen" fill priority unoptimized className="object-cover" />
              </div>
              <SutureOverlay />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SurgicalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Base gradient to lift above pure black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1420] via-[#0b121a] to-[#0b0f14]" />
      {/* Surgical blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.06) 23px), repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(255,255,255,0.06) 23px)",
        }}
      />
      {/* Cool hue washes */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(15,110,166,0.22),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_90%_40%,rgba(184,90,106,0.16),transparent)]" />
    </div>
  );
}

function FrameAssembler() {
  const piece = (cls: string, from: any, delay = 0) => (
    <motion.div
      initial={{ opacity: 0, ...from }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cls}
      style={{ willChange: "transform, opacity" }}
    />
  );
  return (
    <div aria-hidden className="absolute -inset-x-12 -top-16 -bottom-12 hidden sm:block">
      {piece("absolute left-0 right-0 top-6 h-px bg-white/15", { y: -32 }, 0.18)}
      {piece("absolute left-0 top-6 bottom-16 w-px bg-white/10", { x: -32 }, 0.24)}
      {piece("absolute right-0 top-10 bottom-0 w-px bg-white/10", { x: 32 }, 0.3)}
      {piece("absolute left-[8%] right-[8%] bottom-12 h-px bg-white/10", { y: 32 }, 0.36)}
    </div>
  );
}

function SutureOverlay() {
  return (
    <svg className="absolute inset-0" viewBox="0 0 100 100" aria-hidden>
      {/* Curved suture */}
      <motion.path
        d="M 8 70 C 25 40, 60 50, 92 28"
        fill="none"
        stroke="#f6f4f2"
        strokeOpacity={0.45}
        strokeWidth={0.5}
        strokeDasharray="2 4"
        initial={{ pathLength: 0, pathOffset: 0 }}
        animate={{ pathLength: 1, pathOffset: [0, 0.25, 0] }}
        transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
      />
      {/* Cross markers */}
      {[[18, 64], [34, 56], [52, 52], [74, 42]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity={0.7}>
          <motion.line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="#f6f4f2" strokeWidth="0.5" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }} />
          <motion.line x1="0" y1="-1.8" x2="0" y2="1.8" stroke="#f6f4f2" strokeWidth="0.5" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }} />
        </g>
      ))}
    </svg>
  );
}
