"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt,
  className,
  strength = 16,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ''}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={src} alt={alt} fill className="object-cover" unoptimized sizes={sizes} />
      </motion.div>
    </div>
  );
}

