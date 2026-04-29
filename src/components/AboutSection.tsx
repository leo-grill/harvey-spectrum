import Image from "next/image";

const labelClass = "font-mono text-[14px] uppercase text-[#1f1f1f] leading-[1.1]";

// L-shaped corner bracket. Rotate 90/180/270 for other corners.
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

const quoteText =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

function QuoteBlock({ className }: { className?: string }) {
  return (
    <div className={`flex gap-3 items-stretch ${className ?? ""}`}>
      {/* Left bracket column: top-left and bottom-left corners */}
      <div className="flex flex-col items-start justify-between shrink-0 w-6">
        <Corner />
        <Corner className="-rotate-90" />
      </div>

      {/* Text */}
      <p className="flex-1 text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3">
        {quoteText}
      </p>

      {/* Right bracket column: top-right and bottom-right corners */}
      <div className="flex flex-col items-end justify-between shrink-0 w-6">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-20" id="about">

      {/* ── Mobile layout ── */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className={labelClass}>002</p>
        <p className={labelClass}>[ About ]</p>
        <QuoteBlock />
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "436/614" }}>
          <Image
            src="/about-portrait.png"
            alt="Portrait"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Desktop layout ── */}
      {/*
        Left:  [ About ] label (shrink-0)
        Right: flex-row items-end
                 ├── quote block (flex-1, bottom-aligned by parent items-end)
                 └── 002 label + portrait (side-by-side, items-start)
      */}
      <div className="hidden md:flex items-start justify-between">
        <p className={labelClass}>[ About ]</p>

        {/* Right column: 983/1376 ≈ 71.44% of content area */}
        <div className="flex gap-8 items-end w-[71.44%]">

          {/* Quote block — grows to fill remaining width, sits at bottom */}
          <QuoteBlock className="flex-1 min-w-0" />

          {/* 002 label + portrait — 002 sits top-left of the photo */}
          {/* 486/983 ≈ 49.44% of right column */}
          <div className="flex gap-6 items-start shrink-0 w-[49.44%]">
            <p className={labelClass}>002</p>
            {/* Photo fills remaining width after the label, maintains aspect ratio */}
            <div
              className="relative flex-1 overflow-hidden"
              style={{ aspectRatio: "436/614" }}
            >
              <Image
                src="/about-portrait.png"
                alt="Portrait"
                fill
                className="object-cover"
                sizes="35vw"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
