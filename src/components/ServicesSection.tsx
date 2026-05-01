"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

const labelClass = "font-mono text-[14px] uppercase text-white leading-[1.1]";

const services = [
  {
    number: "[ 1 ]",
    title: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-brand-discovery.png",
  },
  {
    number: "[ 2 ]",
    title: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-web-design.png",
  },
  {
    number: "[ 3 ]",
    title: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-marketing.png",
  },
  {
    number: "[ 4 ]",
    title: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-photography.png",
  },
];

function ServiceItem({ service }: { service: (typeof services)[0] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.5, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 8, duration: 0.5, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div
      ref={rowRef}
      className="flex flex-col gap-[9px] cursor-default"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <p className={labelClass}>{service.number}</p>
      <div className="w-full h-px bg-white" />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mt-[3px]">
        <p
          ref={titleRef}
          className="font-bold italic text-[36px] text-white tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {service.title}
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
            {service.description}
          </p>
          <div ref={imgRef} className="relative shrink-0 size-[151px] overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="151px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-black px-4 py-12 md:px-8 md:py-20" id="services" data-nav-theme="dark">
      <p className={labelClass}>[ services ]</p>

      <div className="flex items-center justify-between mt-6 md:mt-8">
        <span className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase text-white whitespace-nowrap">
          [4]
        </span>
        <span className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase text-white whitespace-nowrap">
          Deliverables
        </span>
      </div>

      <div className="flex flex-col gap-12 mt-8 md:mt-12">
        {services.map((service) => (
          <ServiceItem key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
}
