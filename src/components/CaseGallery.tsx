"use client";
import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type Category = "hand" | "burn" | "nerve" | "aesthetic";

export type CaseItem = {
  id: string;
  title: string;
  category: Category;
  src: string;
  blurb?: string;
};

const categories: { key: Category; label: string }[] = [
  { key: "hand", label: "Hand" },
  { key: "burn", label: "Burn" },
  { key: "nerve", label: "Nerve" },
  { key: "aesthetic", label: "Aesthetic" },
];

// High quality placeholders (replace with real assets later)
const CASES: CaseItem[] = [
  { id: "h1", title: "Thumb replantation", category: "hand", src: "https://5.imimg.com/data5/IOS/Default/2023/1/LX/TJ/BX/2530125/product-jpeg-500x500.png" },
  { id: "n1", title: "Median nerve graft", category: "nerve", src: "https://images.unsplash.com/photo-1559757175-08c8d4e2b033?q=80&w=1640&auto=format&fit=crop" },
  { id: "b1", title: "Post-burn release", category: "burn", src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1640&auto=format&fit=crop" },
  { id: "a1", title: "Rhinoplasty", category: "aesthetic", src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1640&auto=format&fit=crop" },
  { id: "h2", title: "Tendon repair", category: "hand", src: "https://images.unsplash.com/photo-1512102438733-bfa4ed29aef0?q=80&w=1640&auto=format&fit=crop" },
  { id: "n2", title: "Ulnar nerve transfer", category: "nerve", src: "https://images.unsplash.com/photo-1578496479535-0f57d30f6cfc?q=80&w=1640&auto=format&fit=crop" },
  { id: "b2", title: "Scar revision", category: "burn", src: "https://images.unsplash.com/photo-1522335789203-9e5c0f3b381f?q=80&w=1640&auto=format&fit=crop" },
  { id: "a2", title: "Lower blepharoplasty", category: "aesthetic", src: "https://images.unsplash.com/photo-1519751138087-5a3a3c920eb0?q=80&w=1640&auto=format&fit=crop" },
  { id: "h3", title: "Dupuytren release", category: "hand", src: "https://images.unsplash.com/photo-1533139502658-0198f920d8b2?q=80&w=1640&auto=format&fit=crop" },
  { id: "n3", title: "Digital nerve repair", category: "nerve", src: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1640&auto=format&fit=crop" },
  { id: "b3", title: "Contracture correction", category: "burn", src: "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?q=80&w=1640&auto=format&fit=crop" },
  { id: "a3", title: "Breast reduction", category: "aesthetic", src: "https://images.unsplash.com/photo-1522335789203-5b4e0f384fbb?q=80&w=1640&auto=format&fit=crop" },
];

export default function CaseGallery({ items: itemsProp }: { items?: CaseItem[] } = {}) {
  const [active, setActive] = useState<Category | "all">("all");
  const [visible, setVisible] = useState(8);
  const source = itemsProp && itemsProp.length ? itemsProp : CASES;
  const items = useMemo(() => (active === "all" ? source : source.filter((c) => c.category === active)), [active, source]);

  return (
    <div className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setActive("all")} className={`px-4 py-2 rounded-full border border-white/15 ${active === "all" ? "bg-white/10" : "hover:bg-white/5"}`}>All</button>
          {categories.map((c) => (
            <button key={c.key} onClick={() => { setActive(c.key); setVisible(8); }} className={`px-4 py-2 rounded-full border border-white/15 ${active === c.key ? "bg-white/10" : "hover:bg-white/5"}`}>{c.label}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, visible).map((item, idx) => (
            <Card key={item.id} item={item} index={idx} />
          ))}
        </div>

        {visible < items.length && (
          <LoadMore onVisible={() => setVisible((v) => v + 6)} />
        )}
      </div>
    </div>
  );
}

function Card({ item, index }: { item: CaseItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.2) }}
      className="group overflow-hidden rounded-xl border border-white/10 bg-white/5"
    >
      <div className="relative aspect-[4/3]">
        <Image src={item.src} alt={item.title} fill priority={index < 3} unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h4 className="font-display text-lg">{item.title}</h4>
          <p className="text-xs text-porcelain/60 capitalize">{item.category}</p>
        </div>
        <span className="text-porcelain/50">Before/After</span>
      </div>
    </motion.article>
  );
}

function LoadMore({ onVisible }: { onVisible: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "200px 0px 0px 0px" });
  if (inView) onVisible();
  return <div ref={ref} className="h-10" />;
}
