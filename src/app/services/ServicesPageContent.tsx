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
import { useContactModal } from "@/components/ContactModal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Types ──────────────────────────────────────────────────────────────────

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

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServicesPageData {
  heroSubheading?: string;
  processSteps?: ProcessStep[];
  ctaHeading?: string;
}

// ── Fallbacks ──────────────────────────────────────────────────────────────

const DEFAULT_SUBHEADING =
  "From brand identity to web development and photography — a full suite of creative services designed to help ambitious businesses grow.";

const DEFAULT_PROCESS: ProcessStep[] = [
  { number: "01", title: "Discovery",     description: "We start by listening. Deep-dive sessions into your brand, goals, and audience to make sure we're building the right thing, the right way." },
  { number: "02", title: "Strategy",      description: "We map the creative direction, define scope, and agree on a clear plan before a single pixel is moved. No surprises." },
  { number: "03", title: "Craft",         description: "This is where it comes alive. Design, development, copy, and photography — executed with precision and care at every detail." },
  { number: "04", title: "Launch & Grow", description: "We ship and don't disappear. Post-launch we iterate, optimise, and support as your brand continues to evolve." },
];

const DEFAULT_CTA_HEADING = "Let's Build\nSomething Great";

// Static image fallbacks keyed by order
const STATIC_IMAGES: Record<number, string> = {
  1: "/service-brand-discovery.png",
  2: "/service-web-design.png",
  3: "/service-marketing.png",
  4: "/service-photography.png",
};

function resolveServiceImage(item: ServiceItem, index: number): string {
  if (item.coverImage) return urlFor(item.coverImage).width(900).auto("format").url();
  if (item.imageUrl)   return item.imageUrl;
  return STATIC_IMAGES[index + 1] ?? "";
}

// ── Shared ─────────────────────────────────────────────────────────────────

const lbl = "font-mono text-[14px] uppercase leading-[1.1]";

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero({ subheading }: { subheading: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const { openModal } = useContactModal();

  useGSAP(() => {
    gsap.from(headingRef.current, { y: 56, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.1 });
    gsap.from(subRef.current,     { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.35 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black px-4 pt-40 pb-16 md:px-8 md:pt-52 md:pb-24 overflow-hidden" data-nav-theme="dark">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-8 md:mb-12">
        <p className={`${lbl} text-white/40`}>[ Services ] / H.Studio</p>
        <p className={`${lbl} text-white/40`}>004</p>
      </div>
      <div ref={headingRef}>
        <h1 className="font-light text-white tracking-[-0.08em] leading-[0.84] uppercase" style={{ fontSize: "clamp(52px, 10.5vw, 140px)" }}>
          What We<br />Do Best
        </h1>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mt-8 md:mt-12">
        <p ref={subRef} className="text-white/50 text-[14px] tracking-[-0.04em] leading-[1.35] max-w-[420px]">
          {subheading}
        </p>
        <SweepButton className="border border-white/30 text-[13px] font-medium tracking-[-0.02em] px-5 py-2.5 rounded-full w-fit" onClick={openModal}>
          Start a project
        </SweepButton>
      </div>
    </section>
  );
}

// ── Service rows ───────────────────────────────────────────────────────────

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const rowRef   = useRef<HTMLDivElement>(null);
  const imgWrap  = useRef<HTMLDivElement>(null);
  const imgEl    = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const flip     = index % 2 !== 0;
  const src      = resolveServiceImage(service, index);

  useGSAP(() => {
    gsap.fromTo(imgWrap.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut",
        scrollTrigger: { trigger: rowRef.current, start: "top 72%" } }
    );
    gsap.fromTo(imgEl.current, { scale: 1.12 }, {
      scale: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: rowRef.current, start: "top 72%" },
    });
    gsap.from(textRef.current, {
      y: 32, opacity: 0, duration: 0.85, ease: "power3.out",
      scrollTrigger: { trigger: rowRef.current, start: "top 70%" },
    });
  }, { scope: rowRef });

  const imageBlock = (
    <div ref={imgWrap} className="w-full md:w-[46%] shrink-0 overflow-hidden">
      <div ref={imgEl} className="relative w-full will-change-transform" style={{ aspectRatio: "3/2" }}>
        {src && <Image src={src} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 46vw" />}
      </div>
    </div>
  );

  const textBlock = (
    <div ref={textRef} className="flex-1 min-w-0 flex flex-col justify-between gap-8 md:gap-0">
      <div className="flex flex-col gap-5">
        <h2 ref={titleRef}
          className="font-bold italic text-[clamp(32px,5.5vw,72px)] text-black tracking-[-0.04em] leading-[1.0] uppercase will-change-transform"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {service.title}
        </h2>
        <p className="text-[14px] text-[#1f1f1f] leading-[1.4] tracking-[-0.04em] max-w-[440px]">
          {service.description ?? ""}
        </p>
      </div>
      {service.tags && service.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {service.tags.map((tag) => (
            <span key={tag} className="font-mono text-[11px] uppercase tracking-[0.06em] border border-[#1f1f1f]/30 px-3 py-1.5 rounded-full text-[#1f1f1f]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="flex flex-col gap-[10px] cursor-default"
      onMouseEnter={() => gsap.to(titleRef.current, { x: 8, duration: 0.5, ease: "power2.out" })}
      onMouseLeave={() => gsap.to(titleRef.current, { x: 0, duration: 0.5, ease: "power2.out" })}
    >
      <p className={`${lbl} text-[#1f1f1f]`}>{service.number ?? `[ 0${index + 1} ]`}</p>
      <div className="w-full h-px bg-[#1f1f1f]" />
      <div className={`flex flex-col gap-8 md:gap-12 mt-4 md:flex-row md:items-start ${flip ? "md:flex-row-reverse" : ""}`}>
        {imageBlock}
        {textBlock}
      </div>
    </div>
  );
}

function ServicesListSection({ services }: { services: ServiceItem[] }) {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-16 md:gap-24">
        {services.map((service, i) => (
          <ServiceRow key={service._id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Process ────────────────────────────────────────────────────────────────

function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    itemRefs.current.filter(Boolean).forEach((el, i) => {
      gsap.from(el, {
        y: 44, opacity: 0, duration: 0.75, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black px-4 py-12 md:px-8 md:py-20" data-nav-theme="dark">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-12 md:mb-20">
        <div className="flex items-start gap-[10px]">
          <h2 className="font-light text-white tracking-[-0.08em] leading-[0.84] uppercase" style={{ fontSize: "clamp(32px, 6.67vw, 88px)" }}>
            How We Work
          </h2>
          <p className={`${lbl} text-white/40 mt-1`}>005</p>
        </div>
        <p className={`${lbl} text-white/40 hidden md:block`}>[ Process ]</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {steps.map((step, i) => (
          <div key={step.number} ref={(el) => { itemRefs.current[i] = el; }} className="flex flex-col gap-4 border-t border-white/15 py-8 md:py-10 md:pr-16">
            <p className={`${lbl} text-white/30`}>{step.number}</p>
            <h3 className="font-bold italic text-[28px] md:text-[36px] text-white tracking-[-0.04em] leading-[1.05] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              {step.title}
            </h3>
            <p className="text-[14px] text-white/50 leading-[1.4] tracking-[-0.04em] max-w-[380px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CTA strip ──────────────────────────────────────────────────────────────

function CTAStrip({ heading }: { heading: string }) {
  const ref = useRef<HTMLElement>(null);
  const { openModal } = useContactModal();

  useGSAP(() => {
    gsap.from(".services-cta-text", {
      y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, { scope: ref });

  const lines = heading.split("\n");

  return (
    <section ref={ref} className="bg-white px-4 py-16 md:px-8 md:py-24 border-t border-[#1f1f1f]/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="services-cta-text flex flex-col gap-2">
          <p className={`${lbl} text-[#1f1f1f]/50`}>[ Ready? ]</p>
          <p className="font-light text-black tracking-[-0.08em] leading-[0.88] uppercase" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>
            {lines.map((line, i) => (
              <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
            ))}
          </p>
        </div>
        <SweepButton className="bg-black text-[14px] font-medium tracking-[-0.04em] px-6 py-4 rounded-full w-fit" onClick={openModal}>
          Start a project
        </SweepButton>
      </div>
    </section>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function ServicesPageContent({
  pageData,
  services,
}: {
  pageData: ServicesPageData | null;
  services: ServiceItem[];
}) {
  const steps = pageData?.processSteps?.length ? pageData.processSteps : DEFAULT_PROCESS;

  return (
    <>
      <Navbar />
      <main>
        <Hero subheading={pageData?.heroSubheading ?? DEFAULT_SUBHEADING} />
        <ServicesListSection services={services} />
        <ProcessSection steps={steps} />
        <CTAStrip heading={pageData?.ctaHeading ?? DEFAULT_CTA_HEADING} />
        <Footer />
      </main>
    </>
  );
}
