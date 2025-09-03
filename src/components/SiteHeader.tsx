"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-20 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-lg">SY</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/procedures" className="hover:text-porcelain/80">Procedures</Link>
          <Link href="/cases" className="hover:text-porcelain/80">Cases</Link>
          <a href="#book" className="text-surgical">Book</a>
        </nav>

        {/* Burger */}
        <button
          aria-label="Open menu"
          onClick={toggle}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/15 hover:bg-white/5"
        >
          <span className="sr-only">Menu</span>
          <div className="relative w-5 h-5">
            <span className={`absolute inset-x-0 top-[4px] h-[2px] bg-current transition ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`absolute inset-x-0 top-[9px] h-[2px] bg-current transition ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute inset-x-0 top-[14px] h-[2px] bg-current transition ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-[rgba(12,20,32,0.8)] backdrop-blur"
          >
            <div className="px-6 py-3 flex flex-col gap-2 text-sm">
              <Link href="/procedures" onClick={close} className="py-2">Procedures</Link>
              <Link href="/cases" onClick={close} className="py-2">Cases</Link>
              <a href="#book" onClick={close} className="py-2 text-surgical">Book</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

