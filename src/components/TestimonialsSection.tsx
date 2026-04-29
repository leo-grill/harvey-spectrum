interface Testimonial {
  quote: string;
  name: string;
  logo: string;
  logoW: number;
  logoH: number;
  rotation: string;
  left: string;
  top: number;
  z: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    logo: "/logo-lukas.svg",
    logoW: 138,
    logoH: 20,
    rotation: "rotate-[2.9deg]",
    left: "46.9%",
    top: 150,
    z: "z-0",
  },
  {
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    logo: "/logo-marko.svg",
    logoW: 143,
    logoH: 19,
    rotation: "rotate-[-6.85deg]",
    left: "7.1%",
    top: 142,
    z: "z-0",
  },
  {
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    logo: "/logo-sarah.svg",
    logoW: 109,
    logoH: 31,
    rotation: "rotate-[2.23deg]",
    left: "21.2%",
    top: 553,
    z: "z-0",
  },
  {
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    logo: "/logo-sofia.svg",
    logoW: 81,
    logoH: 37,
    rotation: "rotate-[-4.15deg]",
    left: "68.5%",
    top: 546,
    z: "z-0",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className={t.rotation}>
      <div className="bg-[#f1f1f1] border border-[#dddddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px] shrink-0">
        {/* SVG logos rendered with <img> so the browser handles them natively */}
        <img
          src={t.logo}
          alt=""
          width={t.logoW}
          height={t.logoH}
          style={{ width: t.logoW, height: t.logoH, objectFit: "contain", objectPosition: "left" }}
        />
        <p className="text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          {t.quote}
        </p>
        <p className="font-black text-[16px] text-black tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap">
          {t.name}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#f0f0f0] overflow-hidden">

      {/* ── Mobile: heading + horizontal scroll ── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <p className="font-medium text-[64px] text-black text-center tracking-[-0.07em] leading-[0.8] capitalize">
          Testimonials
        </p>
        {/*
          Outer wrapper clips horizontally and bleeds to screen edges.
          The inner row has py-12 so rotated cards aren't clipped vertically —
          overflow-x:auto sets overflow-y:auto too, so we need the padding trick.
        */}
        <div className="overflow-x-auto -mx-4">
          <div className="flex px-4 py-12 gap-0">
            {testimonials.map((t) => (
              <div key={t.name} className="shrink-0 mr-[-10px]">
                <TestimonialCard t={t} />
              </div>
            ))}
            {/* trailing space so last card isn't flush against the edge */}
            <div className="shrink-0 w-4" />
          </div>
        </div>
      </div>

      {/* ── Desktop: absolutely scattered cards around big heading ── */}
      <div className="relative hidden md:block min-h-[860px] py-[120px]">
        {/* Heading centered at z-10 — Lukas Weber's card sits behind it, others in front */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="font-medium text-[13.75vw] text-black text-center tracking-[-0.07em] leading-[1.1] capitalize whitespace-nowrap">
            Testimonials
          </p>
        </div>

        {testimonials.map((t) => (
          <div
            key={t.name}
            className={`absolute ${t.z}`}
            style={{ left: t.left, top: t.top }}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

    </section>
  );
}
