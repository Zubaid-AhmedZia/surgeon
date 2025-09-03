import AnimatedLineArt from "@/components/AnimatedLineArt";
import ScrollTimeline from "@/components/ScrollTimeline";
import type { Metadata } from "next";

const MAP: Record<string, { title: string; summary: string; steps: { title: string; detail: string }[]; animationUrl?: string }>
  = {
    "nerve-grafting": {
      title: "Nerve Grafting",
      summary: "Microsurgical techniques to bridge nerve gaps, restore protective sensation, and optimize motor recovery.",
      steps: [
        { title: "Assessment", detail: "Clinical exam, nerve studies, injury timeline, and donor site planning." },
        { title: "Technique", detail: "Autograft or conduit selection under microscope with tension-free coaptation." },
        { title: "Rehabilitation", detail: "Early protection followed by sensory re-education and targeted therapy." },
        { title: "Risks", detail: "Neuroma, incomplete recovery, donor site numbness, scar." },
      ],
    },
    "tendon-transfer": {
      title: "Tendon Transfer",
      summary: "Re-routing functioning tendons to restore lost motion in balanced arcs.",
      steps: [
        { title: "Assessment", detail: "Identify deficits, donor strength, excursion, and synergy." },
        { title: "Technique", detail: "Pulley protection, tensioning at neutral, robust repair." },
        { title: "Rehabilitation", detail: "Protected motion transitioning to strengthening at 8–12 weeks." },
        { title: "Risks", detail: "Adhesion, imbalance, stiffness, rerupture." },
      ],
    },
    "rhinoplasty": {
      title: "Rhinoplasty",
      summary: "Refined facial balance with support for airflow and long-term stability.",
      steps: [
        { title: "Consultation", detail: "Goals, proportional planning, airway assessment, simulation." },
        { title: "Technique", detail: "Structure-preserving maneuvers to balance tip, dorsum, and base." },
        { title: "Recovery", detail: "Swelling settles over months; routine care and follow-up." },
        { title: "Risks", detail: "Asymmetry, contour irregularity, revision possibility." },
      ],
    },
    "burn-contracture-release": {
      title: "Burn Contracture Release",
      summary: "Release of scar bands with resurfacing to regain reach, grip, and posture.",
      steps: [
        { title: "Assessment", detail: "Contracture pattern, joint involvement, and graft/ flap planning." },
        { title: "Technique", detail: "Z-plasties, local/ regional flaps, or grafting for contour." },
        { title: "Rehabilitation", detail: "Splinting, edema control, and scar modulation to maintain gains." },
        { title: "Risks", detail: "Recurrence, graft loss, hypertrophic scarring." },
      ],
    },
  };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = MAP[slug];
  return {
    title: item ? `${item.title} | Procedures` : "Procedure",
    description: item?.summary,
  };
}

export default async function ProcedurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = MAP[slug];
  if (!item) return <div className="pt-24 px-6">Not found</div>;
  return (
    <main className="pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <h1 className="font-display text-4xl md:text-6xl">{item.title}</h1>
            <p className="mt-3 text-porcelain/80">{item.summary}</p>
          </div>
          <div className="md:col-span-6">
            <AnimatedLineArt className="w-full" animationUrl={item.animationUrl} />
          </div>
        </header>

        <section className="mt-12">
          <ScrollTimeline steps={item.steps} />
        </section>
      </div>
    </main>
  );
}
