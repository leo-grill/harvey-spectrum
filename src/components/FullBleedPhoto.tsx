"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FullBleedPhoto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      overlayRef.current,
      { scaleX: 1 },
      {
        scaleX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[500px] md:h-[900px] overflow-hidden"
      data-nav-theme="dark"
    >
      <Image
        src="/divider-photo.png"
        alt=""
        fill
        className="object-cover object-[65%_center] md:object-center"
        sizes="100vw"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black origin-left will-change-transform"
      />
    </div>
  );
}
