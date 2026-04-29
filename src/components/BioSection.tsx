const labelClass =
  "font-mono text-[14px] uppercase text-[#1f1f1f] leading-[1.1]";

const lineClass =
  "font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap";

export default function BioSection() {
  return (
    <section className="bg-white text-black px-4 py-12 md:px-8 md:py-[120px] overflow-hidden">
      {/* Header: label + 1px divider */}
      <div className="flex flex-col gap-3 items-end mb-6">
        <p className={`${labelClass} text-right`}>[ 8+ years in industry ]</p>
        <div className="w-full h-px bg-[#1f1f1f]" />
      </div>

      {/* Lines */}
      <div className="flex flex-col gap-2">
        {/* 001 – mobile only, above line 1 */}
        <p className={`${labelClass} md:hidden text-center`}>001</p>

        {/* Line 1: A creative director   / + 001 (desktop) */}
        <div className="flex justify-center md:justify-start items-baseline gap-3">
          <span className={`${lineClass} whitespace-pre`}>
            A creative director   /
          </span>
          <span className={`${labelClass} hidden md:block`}>001</span>
        </div>

        {/* Line 2: Photographer – indented 15.55% on desktop */}
        <div className="text-center md:text-left md:pl-[15.55%]">
          <span className={lineClass}>Photographer</span>
        </div>

        {/* Line 3: Born & raised – indented 44.33% on desktop */}
        {/* The & uses Playfair Display italic per the Figma spec */}
        <div className="text-center md:text-left md:pl-[44.33%]">
          <span className={lineClass}>
            Born{" "}
            <span
              className="italic normal-case"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              &amp;
            </span>
            {" "}raised
          </span>
        </div>

        {/* Line 4: on the south side – no indent */}
        <div className="text-center md:text-left">
          <span className={lineClass}>on the south side</span>
        </div>

        {/* Line 5: of chicago. + [ creative freelancer ] inline on desktop */}
        {/* Label sits beside the period at ~26px below the line top (mt-[1.8vw] scales with font) */}
        <div className="flex items-start justify-center md:justify-start md:pl-[44.04%] gap-[8px]">
          <span className={lineClass}>of chicago.</span>
          <span className={`${labelClass} hidden md:inline-block whitespace-nowrap mt-[1.8vw]`}>
            [ creative freelancer ]
          </span>
        </div>

        {/* [ creative freelancer ] – mobile only, below */}
        <p className={`${labelClass} md:hidden text-center`}>
          [ creative freelancer ]
        </p>
      </div>
    </section>
  );
}
