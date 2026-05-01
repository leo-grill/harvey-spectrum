"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";
import type { PortfolioItem } from "@/components/SelectedWorkSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const lbl = "font-mono text-[14px] uppercase leading-[1.1]";

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero({ count }: { count: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headingRef.current, { y: 56, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.1 });
    gsap.from(metaRef.current,    { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-black px-4 pt-40 pb-16 md:px-8 md:pt-52 md:pb-24"
      data-nav-theme="dark"
    >
      <div ref={metaRef} className="flex items-start justify-between mb-8 md:mb-12">
        <p className={`${lbl} text-white/40`}>[ Projects ] / H.Studio</p>
        <p className={`${lbl} text-white/40`}>{String(count).padStart(2, "0")} Projects</p>
      </div>

      <div ref={headingRef}>
        <h1
          className="font-light text-white tracking-[-0.08em] leading-[0.84] uppercase"
          style={{ fontSize: "clamp(52px, 10.5vw, 140px)" }}
        >
          Selected<br />Work
        </h1>
      </div>
    </section>
  );
}

// ── Project card ───────────────────────────────────────────────────────────

function resolveImageSrc(item: PortfolioItem): string {
  if (item.coverImage) return urlFor(item.coverImage).width(900).auto("format").url();
  return item.imageUrl ?? "";
}

function ProjectCard({ item }: { item: PortfolioItem }) {
  const src      = resolveImageSrc(item);
  const cardRef  = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    gsap.fromTo(wrapRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.95, ease: "power3.inOut",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" } }
    );
    gsap.fromTo(imgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 0.95, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" } }
    );
  }, { scope: cardRef });

  const onEnter = () => {
    gsap.to(imgRef.current,   { scale: 1.05, duration: 0.5, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 6,        duration: 0.5, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 4, y: -4, duration: 0.4, ease: "power2.out" });
  };
  const onLeave = () => {
    gsap.to(imgRef.current,   { scale: 1,    duration: 0.5, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 0,        duration: 0.5, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 0, y: 0,  duration: 0.4, ease: "power2.out" });
  };

  const inner = (
    <div
      ref={cardRef}
      className="flex flex-col gap-3 cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      <div ref={wrapRef} className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          {src && (
            <Image
              src={src}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        {/* Tag pills over image */}
        {item.tags?.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 z-10">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="backdrop-blur-[10px] bg-white/30 font-medium text-[13px] text-[#111] tracking-[-0.04em] px-2.5 py-1 rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Title + arrow */}
      <div className="flex items-center justify-between">
        <p
          ref={titleRef}
          className="font-black text-[22px] md:text-[32px] text-black tracking-[-0.04em] leading-[1.1] uppercase will-change-transform"
        >
          {item.title}
        </p>
        <svg
          ref={arrowRef}
          width="32" height="32" viewBox="0 0 32 32" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 will-change-transform"
        >
          <circle cx="16" cy="16" r="15.5" stroke="#111111" />
          <path d="M12 20L20 12M20 12H14M20 12V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );

  return item.projectUrl
    ? <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">{inner}</a>
    : inner;
}

// ── Filter bar ─────────────────────────────────────────────────────────────

function FilterBar({
  tags,
  active,
  onChange,
}: {
  tags: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
      {["All", ...tags].map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={[
            "font-mono text-[12px] uppercase tracking-[0.06em] px-4 py-2 rounded-full border transition-colors duration-200",
            active === tag
              ? "bg-black text-white border-black"
              : "bg-transparent text-[#1f1f1f] border-[#1f1f1f]/30 hover:border-[#1f1f1f]",
          ].join(" ")}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

// ── Grid ───────────────────────────────────────────────────────────────────

function ProjectsGrid({ items }: { items: PortfolioItem[] }) {
  const allTags = useMemo(
    () => Array.from(new Set(items.flatMap((i) => i.tags ?? []))).sort(),
    [items]
  );
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () => activeFilter === "All" ? items : items.filter((i) => i.tags?.includes(activeFilter)),
    [items, activeFilter]
  );

  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8 md:mb-10">
        <p className={`${lbl} text-[#1f1f1f]`}>[ All Projects ]</p>
        <p className={`${lbl} text-[#1f1f1f]/40`}>{filtered.length} shown</p>
      </div>

      {allTags.length > 1 && (
        <FilterBar tags={allTags} active={activeFilter} onChange={setActiveFilter} />
      )}

      {filtered.length === 0 ? (
        <p className="text-[14px] text-[#1f1f1f]/50 tracking-[-0.04em]">No projects match this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
          {filtered.map((item) => (
            <ProjectCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function ProjectsPageContent({ items }: { items: PortfolioItem[] }) {
  return (
    <>
      <Navbar />
      <main>
        <Hero count={items.length} />
        <ProjectsGrid items={items} />
        <Footer />
      </main>
    </>
  );
}
