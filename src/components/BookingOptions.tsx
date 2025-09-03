"use client";
import { useMemo } from "react";

export default function BookingOptions() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-clinic/consult";
  const notion = process.env.NEXT_PUBLIC_NOTION_FORM_URL || "https://notionforms.io/forms/your-form";
  const waHref = useMemo(() => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+92XXXXXXXXXX";
    const text = encodeURIComponent("Hello, I'd like to book a consultation with Dr. Sobia.");
    return `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${text}`;
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      <Card title="Calendly" subtitle="Pick a slot instantly" href={calendly} cta="Open Calendly" />
      <Card title="Notion Form" subtitle="Structured intake before call" href={notion} cta="Open Form" />
      <Card title="WhatsApp" subtitle="Secure, quick handoff" href={waHref} cta="Message on WhatsApp" />
    </div>
  );
}

function Card({ title, subtitle, href, cta }: { title: string; subtitle: string; href: string; cta: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 p-5 bg-white/5 hover:bg-white/10 transition">
      <div className="font-display text-xl">{title}</div>
      <div className="text-porcelain/70 text-sm">{subtitle}</div>
      <div className="mt-3 text-surgical">{cta} →</div>
    </a>
  );
}
