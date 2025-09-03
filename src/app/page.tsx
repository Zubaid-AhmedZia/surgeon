import LenisProvider from "@/components/LenisProvider";
import Hero from "@/components/Hero";
import ScrollSection from "@/components/ScrollSection";
import Link from "next/link";
import Image from "next/image";
import ParallaxImage from "@/components/ParallaxImage";
import BookingOptions from "@/components/BookingOptions";
import VeinBackgroundClient from "@/components/VeinBackgroundClient";

export const dynamic = "force-static";

export default function Page() {
  return (
    <LenisProvider>
      <VeinBackgroundClient />

      <main className="pt-14">
        <Hero />

        <ScrollSection title="Hand Surgery, Reimagined" kicker="Expertise" >
          <p>
            Complex trauma, nerve & tendon reconstruction, microvascular free tissue transfer, congenital hand differences, rheumatoid and degenerative conditions — a comprehensive program focused on restoring <em>function</em> and refined appearance.
          </p>
          <ul className="grid md:grid-cols-2 gap-3 mt-6 list-disc list-inside text-porcelain/80">
            <li>Replantation & microsurgery</li>
            <li>Nerve/tendon repair & grafting</li>
            <li>Post-burn contracture release</li>
            <li>Arthritis & deformity correction</li>
          </ul>
          <div className="mt-6 flex">
            <ParallaxImage
              src="https://www.yourplasticsurgeryguide.com/wp-content/uploads/2019/03/nice-hands.jpg"
              alt="Microsurgical precision"
              strength={14}
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 85vw"
              className="aspect-[4/3] w-[85%] md:w-[360px] lg:w-[420px] rounded-2xl border border-white/10 bg-white/5 mx-auto md:mx-0"
            />
          </div>
        </ScrollSection>

        <ScrollSection title="Aesthetics with Restraint" kicker="Philosophy" >
          <div className="mb-6 flex">
            <ParallaxImage
              src="https://bellevueent.com/wp-content/uploads/2023/01/BENT-Services-Facial-Reconstructive-Surgery-main-image-1024x683.jpeg"
              alt="Refined, natural proportions"
              strength={14}
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 85vw"
              className="aspect-[4/3] w-[85%] md:w-[360px] lg:w-[420px] rounded-2xl border border-white/10 bg-white/5 mx-auto md:mx-0"
            />
          </div>
          <p>
            Subtle, natural, and proportionate. Facial rejuvenation, rhinoplasty, breast & body contouring performed with a conservative ethos — prioritizing harmony over trend.
          </p>
        </ScrollSection>

        <ScrollSection title="Outcomes You Can Trust" kicker="Cases" >
          <p id="cases">
            High-resolution before/after sets protected by patient consent and privacy controls. Each case includes approach, risks, recovery milestones, and functional outcomes.
          </p>
          <div className="mt-6 flex">
            <ParallaxImage
              src="https://cameronhealth.com/wp-content/uploads/2025/07/CameronHealth_Home.jpg"
              alt="Structured case documentation"
              strength={14}
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 85vw"
              className="aspect-[4/3] w-[85%] md:w-[360px] lg:w-[420px] rounded-2xl border border-white/10 bg-white/5 mx-auto md:mx-0"
            />
          </div>
        </ScrollSection>

        <ScrollSection title="Credentials & Ethos" kicker="About Dr. Yasmeen">
          <p>
            Fellowship-trained plastic & reconstructive surgeon. Academic appointments, peer-reviewed publications, and hospital credentials that support advanced microsurgical care.
          </p>
          <div className="mt-6 flex">
            <ParallaxImage
              src="https://nocamels.com/wp-content/uploads/2024/07/pexels-weverton-oliveira-927931218-202177861-1024x599.jpg"
              alt="Credentials and ethos"
              strength={14}
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 85vw"
              className="aspect-[4/3] w-[85%] md:w-[360px] lg:w-[420px] rounded-2xl border border-white/10 bg-white/5 mx-auto md:mx-0"
            />
          </div>
        </ScrollSection>

        <section id="book" className="px-6 pb-32">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 p-8 bg-white/5 backdrop-blur">
            <h3 className="font-display text-2xl mb-2">Book a Consultation</h3>
            <p className="text-porcelain/80">Private clinic • Discreet scheduling • Evidence-based recommendations</p>
            <BookingOptions />
            <form className="grid md:grid-cols-2 gap-4 mt-6" action="/api/book" method="post">
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <input name="name" placeholder="Full name" className="bg-transparent border border-white/15 rounded-xl px-4 py-3" />
              <input name="phone" placeholder="Phone / WhatsApp" className="bg-transparent border border-white/15 rounded-xl px-4 py-3" />
              <input name="email" placeholder="Email" className="bg-transparent border border-white/15 rounded-xl px-4 py-3 md:col-span-2" />
              <textarea name="message" placeholder="What would you like help with?" className="bg-transparent border border-white/15 rounded-xl px-4 py-3 md:col-span-2 min-h-[120px]" />
              <button className="md:col-span-2 justify-self-start rounded-xl px-6 py-3 bg-surgical hover:brightness-110">Request Appointment</button>
            </form>
            <p className="mt-3 text-xs text-porcelain/60">By submitting, you agree that no medical advice is provided on this site; consultations determine candidacy & risks.</p>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-10 text-center text-sm text-porcelain/60">
        © {new Date().getFullYear()} Dr. Sobia Yasmeen — Hand & Plastic Surgery
      </footer>
    </LenisProvider>
  );
}
