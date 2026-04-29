import Image from "next/image";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <section
      className={[
        "relative w-full overflow-hidden",
        "flex flex-col px-4 pb-6 justify-between",       // mobile: justify-between pushes content to bottom
        "md:px-8 md:pb-0 md:justify-start md:gap-60",   // desktop: 240px gap (gap-60) between nav and content
        "h-svh md:h-[847px]",
      ].join(" ")}
    >
      {/* Background image */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        className="object-cover object-center pointer-events-none select-none"
        priority
        sizes="100vw"
      />

      {/* Frosted glass overlay – fades upward via mask */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero content */}
      <div className="relative flex flex-col w-full md:items-center">
        {/* Title */}
        <div className="relative w-full">
          <div className="flex items-center justify-center md:justify-start px-[18px]">
            <p className="font-mono text-[14px] text-white uppercase mix-blend-overlay leading-[1.1]">
              [ Hello i&apos;m ]
            </p>
          </div>
          <h1
            className={[
              "text-white text-center capitalize font-medium",
              "mix-blend-overlay tracking-[-0.07em] w-full",
              // Mobile: wraps to 2 lines at ~96px. Desktop: scales proportionally with vw, never wraps.
              "text-[clamp(60px,24vw,96px)] md:text-[13.75vw]",
              "leading-[0.8] md:leading-[1.1]",
              "whitespace-pre-wrap md:whitespace-nowrap",
            ].join(" ")}
          >
            {"Harvey   Specter"}
          </h1>
        </div>

        {/* Description + CTA */}
        <div className="mt-4 flex w-full md:justify-end">
          <div className="flex flex-col gap-[17px] items-start w-full md:w-[294px]">
            <p className="text-[#1f1f1f] text-[14px] font-bold italic uppercase tracking-[-0.04em] leading-[1.1]">
              H.Studio is a{" "}
              <span className="font-normal">full-service</span>
              {" "}creative studio creating beautiful digital experiences and
              products. We are an{" "}
              <span className="font-normal">award winning</span>
              {" "}desing and art group specializing in branding, web design and
              engineering.
            </p>
            <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer hover:opacity-80 transition-opacity">
              Let&apos;s talk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
