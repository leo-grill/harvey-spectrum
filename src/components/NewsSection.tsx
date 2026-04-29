import Image from "next/image";

function SmallArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="9" cy="9" r="8.5" stroke="#111111" />
      <path d="M6.5 11.5L11.5 6.5M11.5 6.5H7.5M11.5 6.5V10.5" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReadMoreLink() {
  return (
    <a href="#" className="border-b border-black flex gap-[10px] items-center py-1 w-fit">
      <span className="font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap">Read more</span>
      <SmallArrowIcon />
    </a>
  );
}

interface NewsCardProps {
  image: string;
  description: string;
  offset?: boolean;
}

function NewsCard({ image, description, offset = false }: NewsCardProps) {
  return (
    <div className={`flex flex-col gap-4 w-full shrink-0 ${offset ? "lg:pt-[120px]" : ""}`}>
      <div className="relative w-full h-[398px] lg:h-[469px] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 300px, 353px"
        />
      </div>
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {description}
      </p>
      <ReadMoreLink />
    </div>
  );
}

const articles = [
  {
    image: "/news-1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    offset: false,
  },
  {
    image: "/news-2.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    offset: true,
  },
  {
    image: "/news-3.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    offset: false,
  },
];

export default function NewsSection() {
  return (
    <section className="bg-[#f3f3f3] px-4 py-16 lg:px-8 lg:py-[120px]" id="news">

      {/* ── Mobile / tablet (<lg): heading + horizontal scroll ── */}
      <div className="lg:hidden flex flex-col gap-8">
        <p className="font-light text-[32px] text-black tracking-[-0.08em] leading-[0.86] uppercase">
          Keep up with my latest news &amp; achievements
        </p>
        <div className="overflow-x-auto -mx-4">
          <div className="flex gap-4 px-4 py-2">
            {articles.map((article, i) => (
              <div key={i} className="shrink-0 w-[300px]">
                <NewsCard {...article} offset={false} />
              </div>
            ))}
            <div className="shrink-0 w-4" />
          </div>
        </div>
      </div>

      {/* ── Desktop (≥lg = 1024px): rotated heading + 3 staggered cards ── */}
      <div className="hidden lg:flex items-end justify-between">

        {/* Rotated vertical heading */}
        <div className="flex h-[706px] w-[110px] items-center justify-center shrink-0">
          <div className="-rotate-90 flex-none">
            <p className="font-light text-[64px] text-black tracking-[-0.08em] leading-[0.86] uppercase whitespace-nowrap">
              Keep up with my latest
            </p>
            <p className="font-light text-[64px] text-black tracking-[-0.08em] leading-[0.86] uppercase whitespace-nowrap">
              news &amp; achievements
            </p>
          </div>
        </div>

        {/* 3 flex-1 cards with 1px dividers */}
        <div className="flex items-start flex-1 min-w-0 ml-8">
          <div className="flex-1 min-w-0">
            <NewsCard image="/news-1.jpg" description={articles[0].description} />
          </div>
          <div className="w-px bg-[#1f1f1f] self-stretch mx-[15px] shrink-0" />
          <div className="flex-1 min-w-0">
            <NewsCard image="/news-2.jpg" description={articles[1].description} offset />
          </div>
          <div className="w-px bg-[#1f1f1f] self-stretch mx-[15px] shrink-0" />
          <div className="flex-1 min-w-0">
            <NewsCard image="/news-3.jpg" description={articles[2].description} />
          </div>
        </div>

      </div>
    </section>
  );
}
