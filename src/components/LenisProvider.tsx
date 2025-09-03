"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => { (lenis as any).destroy?.(); };
  }, []);
  return <>{children}</>;
}

