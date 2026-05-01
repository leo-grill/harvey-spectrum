"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import SweepButton from "./SweepButton";
import { useContactModal } from "./ContactModal";

export interface PortfolioItem {
  _id: string;
  title: string;
  tags: string[];
  coverImage?: SanityImageSource;
  imageUrl?: string;
  projectUrl?: string;
  order?: number;
}

const labelClass = "font-mono text-[14px] uppercase text-[#1f1f1f] leading-[1.1]";

function Corner({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 15V1H15"
        stroke="#1f1f1f"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <div className="backdrop-blur-[10px] bg-white/30 flex items-center justify-center px-2 py-1 rounded-full">
      <span className="font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">{label}</span>
    </div>
  );
}

interface ProjectCardProps {
  item: PortfolioItem;
  mobileH: string;
  desktopH: string;
}

function resolveImageSrc(item: PortfolioItem): string {
  if (item.coverImage) {
    return urlFor(item.coverImage).width(900).auto("format").url();
  }
  return item.imageUrl ?? "";
}

function ProjectCard({ item, mobileH, desktopH }: ProjectCardProps) {
  const src = resolveImageSrc(item);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.05, duration: 0.55, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 6, duration: 0.4, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 4, y: -4, duration: 0.4, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.55, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
  };

  const inner = (
    <div
      className="flex flex-col gap-[10px] w-full cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`relative w-full overflow-hidden ${mobileH} ${desktopH}`}>
        <div ref={imgRef} className="absolute inset-0">
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
        <div className="absolute bottom-4 left-4 flex gap-3 z-10">
          {item.tags?.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p
          ref={titleRef}
          className="font-black text-[24px] md:text-[36px] text-black tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap"
        >
          {item.title}
        </p>
        <svg
          ref={arrowRef}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <circle cx="16" cy="16" r="15.5" stroke="#111111" />
          <path d="M12 20L20 12M20 12H14M20 12V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );

  if (item.projectUrl) {
    return (
      <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

function CTABlock({ className }: { className?: string }) {
  const { openModal } = useContactModal();
  return (
    <div className={`flex gap-3 items-stretch w-full md:w-[465px] ${className ?? ""}`}>
      <div className="flex flex-col items-start justify-between shrink-0 w-6">
        <Corner />
        <Corner className="-rotate-90" />
      </div>
      <div className="flex-1 flex flex-col gap-[10px] py-3">
        <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
        </p>
        <SweepButton className="bg-black text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full whitespace-nowrap w-fit" onClick={openModal}>
          Let&apos;s talk
        </SweepButton>
      </div>
      <div className="flex flex-col items-end justify-between shrink-0 w-6">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}

const LEFT_HEIGHTS  = ["md:h-[744px]", "md:h-[699px]"];
const RIGHT_HEIGHTS = ["md:h-[699px]", "md:h-[744px]"];

export default function SelectedWorkSection({ items }: { items: PortfolioItem[] }) {
  const leftItems  = items.slice(0, 2);
  const rightItems = items.slice(2, 4);

  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-20" id="portfolio">

      {/* ── Mobile header ── */}
      <div className="flex flex-col gap-4 mb-8 md:hidden">
        <p className={labelClass}>[ portfolio ]</p>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-light text-[32px] text-black tracking-[-0.08em] leading-[0.86] uppercase">Selected</p>
            <p className="font-light text-[32px] text-black tracking-[-0.08em] leading-[0.86] uppercase">Work</p>
          </div>
          <p className={labelClass}>004</p>
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-start justify-between mb-[61px]">
        <div className="flex items-start gap-[10px] uppercase">
          <div>
            <p className="font-light text-[6.67vw] text-black tracking-[-0.08em] leading-[0.86]">Selected</p>
            <p className="font-light text-[6.67vw] text-black tracking-[-0.08em] leading-[0.86]">Work</p>
          </div>
          <p className={labelClass}>004</p>
        </div>
        <div className="flex h-[110px] w-[15px] items-center justify-center">
          <p className={`${labelClass} -rotate-90 whitespace-nowrap`}>[ portfolio ]</p>
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex flex-col gap-6 md:hidden">
        {items.map((item) => (
          <ProjectCard key={item._id} item={item} mobileH="h-[390px]" desktopH="" />
        ))}
        <CTABlock />
      </div>

      {/* ── Desktop: 2-column staggered ── */}
      <div className="hidden md:flex gap-6 items-stretch">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {leftItems.map((item, i) => (
            <ProjectCard key={item._id} item={item} mobileH="" desktopH={LEFT_HEIGHTS[i]} />
          ))}
          <CTABlock />
        </div>
        <div className="flex-1 flex flex-col gap-[117px] min-w-0 pt-[240px]">
          {rightItems.map((item, i) => (
            <ProjectCard key={item._id} item={item} mobileH="" desktopH={RIGHT_HEIGHTS[i]} />
          ))}
        </div>
      </div>

    </section>
  );
}
