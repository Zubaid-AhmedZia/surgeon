import Link from "next/link";
import AnimatedLineArt from "@/components/AnimatedLineArt";

const procedures = [
  { slug: "nerve-grafting", title: "Nerve Grafting", blurb: "Restore sensation and function after nerve injury." },
  { slug: "tendon-transfer", title: "Tendon Transfer", blurb: "Rebalance motion after tendon or nerve loss." },
  { slug: "rhinoplasty", title: "Rhinoplasty", blurb: "Proportion, nasal airflow, and enduring form." },
  { slug: "burn-contracture-release", title: "Burn Contracture Release", blurb: "Release scarring and restore range of motion." },
];

export const metadata = {
  title: "Procedures | Dr. Sobia Yasmeen",
  description: "Evidence-based procedures with restrained aesthetics and functional outcomes.",
};

export const dynamic = "force-static";

export default function ProceduresIndex() {
  return (
    <main className="pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl">Procedures</h1>
        <p className="mt-3 text-porcelain/75">Explore philosophy, approach, risks, and recovery timelines.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {procedures.map((p) => (
            <Link key={p.slug} href={`/procedures/${p.slug}`} className="group block rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <span className="text-porcelain/60 group-hover:text-porcelain/80 transition">Learn more →</span>
                </div>
                <p className="mt-2 text-porcelain/75">{p.blurb}</p>
              </div>
              <AnimatedLineArt className="px-6 pb-6" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

