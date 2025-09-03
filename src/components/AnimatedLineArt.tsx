"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedLineArt({ animationUrl, className }: { animationUrl?: string; className?: string }) {
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [LottieComp, setLottieComp] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!animationUrl) return;
      try {
        const [json, mod] = await Promise.all([
          fetch(animationUrl).then((r) => r.json()),
          // Optional import: avoid bundler hard dependency
          (new Function("m", "return import(m)") as (m: string) => Promise<any>)("lottie-react").then((m) => m.default).catch(() => null),
        ]);
        if (cancelled) return;
        setAnimationData(json);
        if (mod) setLottieComp(() => mod);
      } catch (e) {
        // fall back silently
      }
    }
    load();
    return () => { cancelled = true; };
  }, [animationUrl]);

  if (animationUrl && animationData && LottieComp) {
    const Lottie = LottieComp;
    return <Lottie animationData={animationData} loop className={className} />;
  }

  return <SvgLine className={className} />;
}

function SvgLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dash = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0.4, 1, 1]);
  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 800 240" className="w-full h-auto" aria-hidden>
        <defs>
          <linearGradient id="surgicalGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0f6ea6" />
            <stop offset="100%" stopColor="#b85a6a" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 180 C 120 60, 220 220, 340 120 S 520 200, 800 80"
          fill="none"
          stroke="url(#surgicalGradient)"
          strokeWidth="3"
          style={{ pathLength: 1, pathOffset: dash, opacity }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
