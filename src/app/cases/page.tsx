import CaseGallery, { type CaseItem } from "@/components/CaseGallery";
import { getCases } from "@/lib/cms";

export const metadata = {
  title: "Cases | Dr. Sobia Yasmeen",
  description: "Curated outcomes across hand, burn, nerve, and aesthetic care.",
};

export const dynamic = "force-static";

export default async function CasesPage() {
  const cmsCases = await getCases().catch(() => [] as any[]);
  const items: CaseItem[] = (cmsCases as any[]).map((c: any) => ({ id: c.id, title: c.title, category: c.category, src: c.image }));
  return (
    <main className="pt-20">
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl">Outcomes</h1>
          <p className="mt-3 text-porcelain/75">Filterable gallery with progressive reveal. Full-res sets require consent.</p>
        </div>
      </section>
      <CaseGallery items={items} />
    </main>
  );
}
