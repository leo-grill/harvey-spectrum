import Image from "next/image";

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

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="16" cy="16" r="15.5" stroke="#111111" />
      <path d="M12 20L20 12M20 12H14M20 12V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  title: string;
  tags: string[];
  image: string;
  mobileH: string;
  desktopH: string;
}

function ProjectCard({ title, tags, image, mobileH, desktopH }: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className={`relative w-full overflow-hidden ${mobileH} ${desktopH}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-black text-[24px] md:text-[36px] text-black tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap">
          {title}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
}

function CTABlock({ className }: { className?: string }) {
  return (
    <div className={`flex gap-3 items-stretch w-full md:w-[465px] ${className ?? ""}`}>
      {/* Left brackets */}
      <div className="flex flex-col items-start justify-between shrink-0 w-6">
        <Corner />
        <Corner className="-rotate-90" />
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col gap-[10px] py-3">
        <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
        </p>
        <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full whitespace-nowrap w-fit">
          Let&apos;s talk
        </button>
      </div>
      {/* Right brackets */}
      <div className="flex flex-col items-end justify-between shrink-0 w-6">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
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
        {/* Vertical "[ portfolio ]" label — rotated text sitting on the right */}
        <div className="flex h-[110px] w-[15px] items-center justify-center">
          <p className={`${labelClass} -rotate-90 whitespace-nowrap`}>[ portfolio ]</p>
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex flex-col gap-6 md:hidden">
        <ProjectCard title="Surfers Paradise"    tags={["Social Media", "Photography"]} image="/portfolio-surfers-paradise.png"   mobileH="h-[390px]" desktopH="" />
        <ProjectCard title="Cyberpunk Caffe"     tags={["Social Media", "Photography"]} image="/portfolio-cyberpunk-caffe.png"    mobileH="h-[390px]" desktopH="" />
        <ProjectCard title="Agency 976"          tags={["Social Media", "Photography"]} image="/portfolio-agency-976.png"         mobileH="h-[390px]" desktopH="" />
        <ProjectCard title="Minimal Playground"  tags={["Social Media", "Photography"]} image="/portfolio-minimal-playground.png" mobileH="h-[390px]" desktopH="" />
        <CTABlock />
      </div>

      {/* ── Desktop: 2-column staggered ── */}
      <div className="hidden md:flex gap-6 items-stretch">
        {/* Left column: 2 cards + CTA, spread to full height via justify-between */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <ProjectCard title="Surfers Paradise" tags={["Social Media", "Photography"]} image="/portfolio-surfers-paradise.png"  mobileH="" desktopH="md:h-[744px]" />
          <ProjectCard title="Cyberpunk Caffe"  tags={["Social Media", "Photography"]} image="/portfolio-cyberpunk-caffe.png"   mobileH="" desktopH="md:h-[699px]" />
          <CTABlock />
        </div>
        {/* Right column: starts 240px down, 2 cards */}
        <div className="flex-1 flex flex-col gap-[117px] min-w-0 pt-[240px]">
          <ProjectCard title="Agency 976"         tags={["Social Media", "Photography"]} image="/portfolio-agency-976.png"         mobileH="" desktopH="md:h-[699px]" />
          <ProjectCard title="Minimal Playground" tags={["Social Media", "Photography"]} image="/portfolio-minimal-playground.png" mobileH="" desktopH="md:h-[744px]" />
        </div>
      </div>

    </section>
  );
}
