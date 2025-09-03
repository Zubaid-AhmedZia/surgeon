"use client";
import dynamic from "next/dynamic";

const VeinBackground = dynamic(() => import("@/components/VeinBackground"), { ssr: false });

export default function VeinBackgroundClient() {
  return <VeinBackground />;
}

