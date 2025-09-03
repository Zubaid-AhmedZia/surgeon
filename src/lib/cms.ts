import { localCases, localProcedures } from "./localData";

async function fetchSanity<T>(query: string): Promise<T | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  if (!projectId) return null;
  const apiVersion = (process.env.SANITY_API_VERSION || "2024-10-01").replace(/^v/, "v");
  const token = process.env.SANITY_READ_TOKEN;
  const host = token ? "api" : "apicdn"; // CDN for public reads
  const url = `https://${projectId}.${host}.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : undefined, cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.result as T) ?? null;
}

export async function getProcedures() {
  const result = await fetchSanity<any[]>(
    `*[_type=="procedure"]{ title, "slug": slug.current, summary, animationUrl, timeline[]{title, detail} }`
  );
  if (!result) return localProcedures;
  return result.map((r) => ({ slug: r.slug, title: r.title, summary: r.summary, animationUrl: r.animationUrl, steps: r.timeline || [] }));
}

export async function getCases() {
  const result = await fetchSanity<any[]>(
    `*[_type=="case"]{ _id, title, category, "image": cover.asset->url }`
  );
  if (!result) return localCases;
  return result.map((r) => ({ id: r._id, title: r.title, category: r.category, image: r.image }));
}
