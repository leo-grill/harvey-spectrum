import Image from "next/image";

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

export default function ServicesSection() {
  return (
    <section className="bg-black px-4 py-12 md:px-8 md:py-20" id="services">
      {/* [ services ] label */}
      <p className={labelClass}>[ services ]</p>

      {/* [4] / DELIVERABLES header */}
      <div className="flex items-center justify-between mt-6 md:mt-8">
        <span className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase text-white whitespace-nowrap">
          [4]
        </span>
        <span className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase text-white whitespace-nowrap">
          Deliverables
        </span>
      </div>

      {/* Service items */}
      <div className="flex flex-col gap-12 mt-8 md:mt-12">
        {services.map((service) => (
          <div key={service.number} className="flex flex-col gap-[9px]">
            {/* Number + divider */}
            <p className={labelClass}>{service.number}</p>
            <div className="w-full h-px bg-white" />

            {/* Content row: desktop flex-row justify-between, mobile flex-col */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mt-[3px]">
              {/* Title */}
              <p
                className="font-bold italic text-[36px] text-white tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {service.title}
              </p>

              {/* Description + thumbnail */}
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                  {service.description}
                </p>
                <div className="relative shrink-0 size-[151px] overflow-hidden">
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
        ))}
      </div>
    </section>
  );
}
