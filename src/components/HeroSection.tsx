"use client";

import Image from "next/image";
import SweepButton from "./SweepButton";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactModal } from "./ContactModal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSection() {
  const { openModal } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const harveyRef  = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);
  const helloRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    tl
      .to([harveyRef.current, helloRef.current], { x: "-30vw", ease: "none" }, 0)
      .to(specterRef.current,                    { x:  "30vw", ease: "none" }, 0)
      .to(bgRef.current,                         { scale: 1.18, ease: "none" }, 0);

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={[
        "relative w-full overflow-hidden",
        "flex flex-col px-4 pb-6 justify-end",
        "md:px-8 md:pb-0 md:justify-start md:pt-[316px]",
        "h-svh md:h-[847px]",
      ].join(" ")}
    >
      {/* Background image — wrapped so GSAP can scale it */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover pointer-events-none select-none"
          style={{ objectPosition: "center 40%" }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Frosted glass overlay – strongest at bottom, fades upward */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[65%] backdrop-blur-[8px] pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 15%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
          maskImage:        "linear-gradient(to top, black 0%, black 15%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative flex flex-col w-full md:items-center">
        <div className="relative w-full">

          {/* "Hello I'm" — animated with Harvey */}
          <div ref={helloRef} className="flex items-center justify-center md:justify-start px-[18px] will-change-transform">
            <p className="font-mono text-[14px] text-white uppercase mix-blend-overlay leading-[1.1]">
              [ Hello i&apos;m ]
            </p>
          </div>

          {/* Harvey / Specter — each animated independently */}
          <h1
            className={[
              "text-white text-center capitalize font-medium",
              "mix-blend-overlay tracking-[-0.07em] w-full",
              "text-[clamp(60px,24vw,96px)] md:text-[13.75vw]",
              "leading-[0.8] md:leading-[1.1]",
              "whitespace-pre-wrap md:whitespace-nowrap",
            ].join(" ")}
          >
            <span ref={harveyRef} className="inline-block will-change-transform">Harvey</span>
            {"   "}
            <span ref={specterRef} className="inline-block will-change-transform">Specter</span>
          </h1>
        </div>

        {/* Description + CTA */}
        <div className="mt-4 flex w-full justify-center md:justify-end">
          <div className="flex flex-col gap-[17px] items-center md:items-start w-full md:w-[294px]">
            <p className="text-[#1f1f1f] text-[14px] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-center md:text-left">
              H.Studio is a{" "}
              <span className="font-normal">full-service</span>
              {" "}creative studio creating beautiful digital experiences and
              products. We are an{" "}
              <span className="font-normal">award winning</span>
              {" "}desing and art group specializing in branding, web design and
              engineering.
            </p>
            <SweepButton className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-3xl" onClick={openModal}>
              Let&apos;s talk
            </SweepButton>
          </div>
        </div>
      </div>
    </section>
  );
}
