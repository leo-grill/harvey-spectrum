"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const lbl = "font-mono text-[14px] uppercase leading-[1.1]";

export interface NewsArticle {
  _id: string;
  title: string;
  description?: string;
  image?: SanityImageSource;
  imageUrl?: string;
  link?: string;
  publishedAt?: string;
  order?: number;
}

function resolveImageSrc(article: NewsArticle): string {
  if (article.image) return urlFor(article.image).width(800).auto("format").url();
  return article.imageUrl ?? "";
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero({ count }: { count: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headingRef.current, { y: 56, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.1 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black px-4 pt-40 pb-16 md:px-8 md:pt-52 md:pb-24" data-nav-theme="dark">
      <div className="flex items-start justify-between mb-8 md:mb-12">
        <p className={`${lbl} text-white/40`}>[ News ] / H.Studio</p>
        <p className={`${lbl} text-white/40`}>{String(count).padStart(2, "0")} Articles</p>
      </div>
      <div ref={headingRef}>
        <h1 className="font-light text-white tracking-[-0.08em] leading-[0.84] uppercase" style={{ fontSize: "clamp(52px, 10.5vw, 140px)" }}>
          News &amp;<br />Insights
        </h1>
      </div>
    </section>
  );
}

// ── Article card ───────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: NewsArticle }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const src     = resolveImageSrc(article);

  useGSAP(() => {
    gsap.fromTo(wrapRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.95, ease: "power3.inOut",
        scrollTrigger: { trigger: cardRef.current, start: "top 82%" } }
    );
    gsap.fromTo(imgRef.current, { scale: 1.1 }, {
      scale: 1, duration: 0.95, ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 82%" },
    });
  }, { scope: cardRef });

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.04, duration: 0.5, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.5, ease: "power2.out" });

  const content = (
    <div ref={cardRef} className="flex flex-col gap-4 group" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div ref={wrapRef} className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          {src && <Image src={src} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {article.publishedAt && (
          <p className={`${lbl} text-[#1f1f1f]/40 text-[12px]`}>
            {new Date(article.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        <p className="font-bold text-[18px] md:text-[22px] text-black tracking-[-0.04em] leading-[1.2] group-hover:opacity-60 transition-opacity">
          {article.title}
        </p>
        {article.description && (
          <p className="text-[14px] text-[#1f1f1f]/60 leading-[1.4] tracking-[-0.02em] line-clamp-2">
            {article.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 border-b border-black pb-1 w-fit">
        <span className="font-medium text-[13px] text-black tracking-[-0.03em]">Read more</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H6M11 3V8" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );

  return article.link
    ? <a href={article.link} target="_blank" rel="noopener noreferrer">{content}</a>
    : <div>{content}</div>;
}

// ── Articles grid ──────────────────────────────────────────────────────────

function ArticlesGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-20">
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <p className={`${lbl} text-[#1f1f1f]`}>[ All Articles ]</p>
        <p className={`${lbl} text-[#1f1f1f]/40`}>{articles.length} shown</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function NewsPageContent({ articles }: { articles: NewsArticle[] }) {
  return (
    <>
      <Navbar />
      <main>
        <Hero count={articles.length} />
        <ArticlesGrid articles={articles} />
        <Footer />
      </main>
    </>
  );
}
