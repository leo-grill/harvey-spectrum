"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SweepButton from "@/components/SweepButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Types ──────────────────────────────────────────────────────────────────

export interface AboutData {
  heroBio?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  portrait?: SanityImageSource;
  stats?: { value: string; label: string }[];
}

export interface ServiceItem {
  _id: string;
  number?: string;
  title: string;
  description?: string;
  tags?: string[];
  coverImage?: SanityImageSource;
  imageUrl?: string;
  order?: number;
}

// ── Fallbacks ──────────────────────────────────────────────────────────────

const DEFAULT_BIO =
  "A full-service creative studio crafting beautiful digital experiences — branding, web design, and engineering.";

const DEFAULT_P1 =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here.";

const DEFAULT_P2 =
  "Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

const DEFAULT_STATS = [
  { value: "5+",  label: "Years of Experience"  },
  { value: "50+", label: "Projects Delivered"   },
  { value: "12+", label: "Awards & Recognition" },
];

const DEFAULT_EXPERTISE: ServiceItem[] = [
  { _id: "e1", number: "[ 1 ]", title: "Brand Identity",     description: "Building distinctive brand systems — strategy, naming, visual language, and guidelines that scale.",                                             tags: [], order: 1 },
  { _id: "e2", number: "[ 2 ]", title: "Web Design & Dev",   description: "Design-led development. Fast, accessible, beautifully crafted sites that perform as well as they look.",                                       tags: [], order: 2 },
  { _id: "e3", number: "[ 3 ]", title: "Marketing & Growth", description: "Creative campaigns, digital strategy, and content that connects with the right audience at the right time.",                                    tags: [], order: 3 },
  { _id: "e4", number: "[ 4 ]", title: "Photography",        description: "Compelling visual content that tells your brand's story — product, editorial, and campaign.", tags: [], order: 4 },
];

// ── Shared ─────────────────────────────────────────────────────────────────

const lbl = "font-mono text-[14px] uppercase leading-[1.1]";

function Corner({ className, color = "#1f1f1f" }: { className?: string; color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M1 15V1H15" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero({ bio }: { bio: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, { y: 48, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.15 });
    gsap.to(bgRef.current, {
      y: "20%", ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden h-svh md:h-[860px] flex flex-col justify-end px-4 pb-10 md:px-8 md:pb-16" data-nav-theme="dark">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image src="/hero-bg.png" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div ref={textRef} className="relative flex flex-col gap-5">
        <p className={`${lbl} text-white/60`}>[ About ] / H.Studio</p>
        <h1 className="font-light text-white tracking-[-0.08em] leading-[0.86] uppercase" style={{ fontSize: "clamp(52px, 9.5vw, 120px)" }}>
          The Studio<br />Behind the Work
        </h1>
        <p className="text-white/60 text-[14px] tracking-[-0.04em] leading-[1.35] max-w-[380px]">{bio}</p>
        <SweepButton href="#story" className="bg-white text-[14px] font-medium tracking-[-0.04em] px-5 py-3 rounded-3xl w-fit mt-1" variant="light">
          Our story
        </SweepButton>
      </div>
    </section>
  );
}

// ── Story / Bio ────────────────────────────────────────────────────────────

function StorySection({ p1, p2, portrait }: { p1: string; p2: string; portrait?: SanityImageSource }) {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef   = useRef<HTMLDivElement>(null);

  const portraitSrc = portrait ? urlFor(portrait).width(800).auto("format").url() : "/about-portrait.png";

  useGSAP(() => {
    gsap.to(quoteRef.current, {
      x: "-60vw", ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top center", end: "bottom top", scrub: 1.5 },
    });
  }, { scope: sectionRef });

  const quoteBlock = (
    <div className="flex gap-3 items-stretch">
      <div className="flex flex-col items-start justify-between shrink-0 w-6">
        <Corner /><Corner className="-rotate-90" />
      </div>
      <div className="flex-1 flex flex-col gap-5 py-3">
        <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{p1}</p>
        <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{p2}</p>
      </div>
      <div className="flex flex-col items-end justify-between shrink-0 w-6">
        <Corner className="rotate-90" /><Corner className="rotate-180" />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-white px-4 py-12 md:px-8 md:py-20 overflow-hidden" id="story">
      {/* Mobile */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className={`${lbl} text-[#1f1f1f]`}>001</p>
        <p className={`${lbl} text-[#1f1f1f]`}>[ The Story ]</p>
        <div ref={quoteRef} className="will-change-transform">{quoteBlock}</div>
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "436/614" }}>
          <Image src={portraitSrc} alt="Portrait" fill className="object-cover" sizes="100vw" />
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <p className={`${lbl} text-[#1f1f1f]`}>[ The Story ]</p>
          <p className={`${lbl} text-[#1f1f1f]`}>001</p>
        </div>
        <div className="flex gap-8 items-end w-[71.44%]">
          <div ref={quoteRef} className="flex-1 min-w-0 will-change-transform">{quoteBlock}</div>
          <div className="flex gap-6 items-start shrink-0 w-[49.44%]">
            <div className="relative flex-1 overflow-hidden" style={{ aspectRatio: "436/614" }}>
              <Image src={portraitSrc} alt="Portrait" fill className="object-cover" sizes="35vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats ──────────────────────────────────────────────────────────────────

function StatsSection({ stats }: { stats: { value: string; label: string }[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    itemRefs.current.filter(Boolean).forEach((el, i) => {
      gsap.from(el, {
        y: 48, opacity: 0, duration: 0.75, delay: i * 0.13, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black px-4 py-12 md:px-8 md:py-20" data-nav-theme="dark">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-10 md:mb-16">
        <p className={`${lbl} text-white`}>[ Studio in Numbers ]</p>
        <p className={`${lbl} text-white/40`}>002</p>
      </div>
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        {stats.map((stat, i) => (
          <div key={stat.value} ref={(el) => { itemRefs.current[i] = el; }} className="flex flex-col gap-2">
            <p className="font-light text-white tracking-[-0.08em] leading-[0.84]" style={{ fontSize: "clamp(64px, 9vw, 108px)" }}>
              {stat.value}
            </p>
            <p className={`${lbl} text-white/40`}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Full-bleed divider ─────────────────────────────────────────────────────

function Divider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { scaleX: 1 }, {
      scaleX: 0, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "top top", scrub: 1.5 },
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative w-full h-[440px] md:h-[720px] overflow-hidden" data-nav-theme="dark">
      <Image src="/divider-photo.png" alt="" fill className="object-cover object-[65%_center] md:object-center" sizes="100vw" />
      <div ref={overlayRef} className="absolute inset-0 bg-black origin-left will-change-transform" />
    </div>
  );
}

// ── Expertise ──────────────────────────────────────────────────────────────

function ExpertiseRow({ item, displayNumber }: { item: ServiceItem; displayNumber: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  return (
    <div
      className="flex flex-col gap-[9px] cursor-default"
      onMouseEnter={() => gsap.to(titleRef.current, { x: 8, duration: 0.5, ease: "power2.out" })}
      onMouseLeave={() => gsap.to(titleRef.current, { x: 0, duration: 0.5, ease: "power2.out" })}
    >
      <p className={`${lbl} text-[#1f1f1f]`}>{displayNumber}</p>
      <div className="w-full h-px bg-[#1f1f1f]" />
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between mt-[3px]">
        <h2 ref={titleRef} className="font-bold italic text-[36px] text-black tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap will-change-transform" style={{ fontFamily: "var(--font-inter)" }}>
          {item.title}
        </h2>
        <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] md:w-[393px]">
          {item.description ?? ""}
        </p>
      </div>
    </div>
  );
}

function ExpertiseSection({ items }: { items: ServiceItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".about-expertise-heading", {
      y: 32, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white px-4 py-12 md:px-8 md:py-20">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div className="flex items-start gap-[10px] uppercase">
          <p className="about-expertise-heading font-light text-black tracking-[-0.08em] leading-[0.86]" style={{ fontSize: "clamp(32px, 6.67vw, 96px)" }}>
            Expertise
          </p>
          <p className={`${lbl} text-[#1f1f1f]`}>003</p>
        </div>
        <p className={`${lbl} text-[#1f1f1f] hidden md:block`}>[ What We Do ]</p>
      </div>
      <div className="flex flex-col gap-10 md:gap-12">
        {items.map((item, i) => (
          <ExpertiseRow key={item._id} item={item} displayNumber={item.number ?? `[ ${i + 1} ]`} />
        ))}
      </div>
    </section>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function AboutPageContent({ aboutData, services }: { aboutData: AboutData | null; services: ServiceItem[] }) {
  const expertise = services.length > 0 ? services : DEFAULT_EXPERTISE;

  return (
    <>
      <Navbar />
      <main>
        <Hero bio={aboutData?.heroBio ?? DEFAULT_BIO} />
        <StorySection
          p1={aboutData?.bioParagraph1 ?? DEFAULT_P1}
          p2={aboutData?.bioParagraph2 ?? DEFAULT_P2}
          portrait={aboutData?.portrait}
        />
        <StatsSection stats={aboutData?.stats?.length ? aboutData.stats : DEFAULT_STATS} />
        <Divider />
        <ExpertiseSection items={expertise} />
        <Footer />
      </main>
    </>
  );
}
