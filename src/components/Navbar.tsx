"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import SweepButton from "./SweepButton";
import { useContactModal } from "./ContactModal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navLinks = [
  { label: "About",    href: "/about"     },
  { label: "Services", href: "/services"  },
  { label: "Projects", href: "/projects"  },
  { label: "News",     href: "/news"     },
  { label: "Contact",  href: "/contact"  },
];

export default function Navbar() {
  const { openModal } = useContactModal();

  // ── state refs ──────────────────────────────────────────────────────
  const isDarkRef  = useRef(false);
  const isOpenRef  = useRef(false);

  // ── element refs ─────────────────────────────────────────────────────
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const menuRef       = useRef<HTMLDivElement>(null);
  const logoRef       = useRef<HTMLAnchorElement>(null);
  const linkRefs      = useRef<(HTMLAnchorElement | null)[]>([]);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaBgRef      = useRef<HTMLButtonElement>(null);
  const ctaLabelRef   = useRef<HTMLSpanElement>(null);
  const ctaFillRef    = useRef<HTMLSpanElement>(null);
  const line1         = useRef<HTMLSpanElement>(null);
  const line2         = useRef<HTMLSpanElement>(null);
  const line3         = useRef<HTMLSpanElement>(null);
  const itemsRef      = useRef<(HTMLElement | null)[]>([]);
  const tlRef         = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(() => {
    // ── initial states ───────────────────────────────────────────────
    gsap.set(menuRef.current,                        { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
    gsap.set(itemsRef.current.filter(Boolean),       { y: 48, opacity: 0 });

    // ── mobile menu timeline ─────────────────────────────────────────
    tlRef.current = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        // restore hamburger lines to the correct resting colour
        const c = isDarkRef.current ? "#fff" : "#000";
        gsap.set([line1.current, line2.current, line3.current],
          { backgroundColor: c, rotation: 0, y: 0, opacity: 1 });
      },
    })
      .to(menuRef.current, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut", pointerEvents: "auto" }, 0)
      .to(line2.current,   { opacity: 0, duration: 0.15 }, 0)
      .to(line1.current,   { y: 7,  rotation:  45, backgroundColor: "#fff", duration: 0.35, ease: "power2.inOut" }, 0.08)
      .to(line3.current,   { y: -7, rotation: -45, backgroundColor: "#fff", duration: 0.35, ease: "power2.inOut" }, 0.08)
      .to(itemsRef.current.filter(Boolean), { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power3.out" }, "-=0.35");

    // ── dark-section colour transitions ──────────────────────────────
    const toLight = () => {
      isDarkRef.current = false;
      gsap.to([logoRef.current, ...linkRefs.current.filter(Boolean)],
        { color: "#000", duration: 0.35, ease: "power2.out" });
      gsap.to(underlineRefs.current.filter(Boolean), { backgroundColor: "#000", duration: 0.35 });
      gsap.to(ctaBgRef.current,   { backgroundColor: "#000", duration: 0.35 });
      gsap.to(ctaLabelRef.current,{ color: "#fff",           duration: 0.35 });
      if (!isOpenRef.current)
        gsap.to([line1.current, line2.current, line3.current], { backgroundColor: "#000", duration: 0.35 });
    };

    const toDark = () => {
      isDarkRef.current = true;
      gsap.to([logoRef.current, ...linkRefs.current.filter(Boolean)],
        { color: "#fff", duration: 0.35, ease: "power2.out" });
      gsap.to(underlineRefs.current.filter(Boolean), { backgroundColor: "#fff", duration: 0.35 });
      gsap.to(ctaBgRef.current,   { backgroundColor: "#fff", duration: 0.35 });
      gsap.to(ctaLabelRef.current,{ color: "#000",           duration: 0.35 });
      if (!isOpenRef.current)
        gsap.to([line1.current, line2.current, line3.current], { backgroundColor: "#fff", duration: 0.35 });
    };

    // Use querySelectorAll so the search is never limited by GSAP scope
    const triggers: ScrollTrigger[] = [];
    document.querySelectorAll("[data-nav-theme='dark']").forEach((el) => {
      triggers.push(ScrollTrigger.create({
        trigger: el as HTMLElement,
        start: "top 72px",
        end:   "bottom 72px",
        onEnter:     toDark,
        onLeave:     toLight,
        onEnterBack: toDark,
        onLeaveBack: toLight,
      }));
    });

    return () => triggers.forEach((t) => t.kill());
  }); // no scope — dark sections live outside this component

  // ── toggle / close ───────────────────────────────────────────────────
  const toggle = contextSafe(() => {
    if (!tlRef.current) return;
    if (!isOpenRef.current) {
      document.body.style.overflow = "hidden";
      tlRef.current.play();
    } else {
      document.body.style.overflow = "";
      tlRef.current.reverse();
    }
    isOpenRef.current = !isOpenRef.current;
  });

  const close = contextSafe(() => {
    if (!tlRef.current || !isOpenRef.current) return;
    document.body.style.overflow = "";
    tlRef.current.reverse();
    isOpenRef.current = false;
  });

  // ── CTA hover ────────────────────────────────────────────────────────
  const onCtaEnter = contextSafe(() => {
    gsap.set(ctaFillRef.current,  { backgroundColor: isDarkRef.current ? "#000" : "#fff" });
    gsap.to(ctaFillRef.current,   { scaleX: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(ctaLabelRef.current,  { color: isDarkRef.current ? "#fff" : "#000", duration: 0.2, delay: 0.1 });
  });
  const onCtaLeave = contextSafe(() => {
    gsap.to(ctaFillRef.current,   { scaleX: 0, duration: 0.35, ease: "power3.in" });
    gsap.to(ctaLabelRef.current,  { color: isDarkRef.current ? "#000" : "#fff", duration: 0.15 });
  });

  // ── NavLink hover (per-index) ─────────────────────────────────────────
  const onLinkEnter = contextSafe((i: number) =>
    gsap.to(underlineRefs.current[i], { scaleX: 1, duration: 0.3, ease: "power2.out" }));
  const onLinkLeave = contextSafe((i: number) =>
    gsap.to(underlineRefs.current[i], { scaleX: 0, duration: 0.25, ease: "power2.in" }));

  return (
    <div ref={wrapperRef}>
      {/* ── Fixed bar ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 md:px-8 py-6">

        <Link href="/" ref={logoRef} className="font-semibold text-base tracking-[-0.04em] capitalize"
          style={{ color: "#000" }}>
          H.Studio
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-14">
          {navLinks.map(({ label, href }, i) => (
            <Link key={label}
              ref={(el) => { linkRefs.current[i] = el; }}
              href={href}
              className="relative font-semibold text-base tracking-[-0.04em] capitalize"
              style={{ color: "#000" }}
              onMouseEnter={() => onLinkEnter(i)}
              onMouseLeave={() => onLinkLeave(i)}
            >
              {label}
              <span ref={(el) => { underlineRefs.current[i] = el; }}
                className="absolute -bottom-0.5 left-0 w-full h-px origin-left"
                style={{ transform: "scaleX(0)", backgroundColor: "#000" }} />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <button ref={ctaBgRef}
          className="hidden md:flex relative overflow-hidden items-center justify-center text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer"
          style={{ backgroundColor: "#000" }}
          onMouseEnter={onCtaEnter} onMouseLeave={onCtaLeave}
          onClick={openModal}>
          <span ref={ctaFillRef} className="absolute inset-0 rounded-3xl origin-left"
            style={{ transform: "scaleX(0)", backgroundColor: "#fff" }} />
          <span ref={ctaLabelRef} className="relative z-10" style={{ color: "#fff" }}>
            Let&apos;s talk
          </span>
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden relative z-[210] w-6 h-5 flex flex-col justify-between cursor-pointer"
          onClick={toggle} aria-label="Toggle menu">
          <span ref={line1} className="block w-full h-[2px] rounded-full origin-center" style={{ backgroundColor: "#000" }} />
          <span ref={line2} className="block w-full h-[2px] rounded-full"              style={{ backgroundColor: "#000" }} />
          <span ref={line3} className="block w-full h-[2px] rounded-full origin-center" style={{ backgroundColor: "#000" }} />
        </button>
      </nav>

      {/* ── Full-screen mobile overlay ────────────────────────────────── */}
      <div ref={menuRef} className="fixed inset-0 z-[200] bg-black flex flex-col md:hidden">
        <div className="flex items-center justify-between px-5 pt-6 shrink-0">
          <span className="font-semibold text-base tracking-[-0.04em] capitalize text-white">H.Studio</span>
          <button onClick={close} aria-label="Close menu"
            className="w-6 h-5 flex flex-col justify-between cursor-pointer">
            <span className="block w-full h-[2px] bg-white rounded-full origin-center rotate-45 translate-y-[9px]" />
            <span className="block w-full h-[2px] bg-white rounded-full origin-center -rotate-45 -translate-y-[9px]" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-5">
          {navLinks.map(({ label, href }, i) => (
            <div key={label} ref={(el) => { itemsRef.current[i] = el; }}
              className="border-t border-white/15">
              <Link href={href}
                className="flex items-center justify-between py-5 group" onClick={close}>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-white/30 text-[11px]">0{i + 1}</span>
                  <span className="text-white text-[46px] font-medium tracking-[-0.04em] capitalize leading-none group-hover:text-white/60 transition-colors duration-200">
                    {label}
                  </span>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                  className="text-white/40 shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
          <div className="border-t border-white/15" />
        </div>

        <div ref={(el) => { itemsRef.current[navLinks.length] = el; }}
          className="px-5 pb-10 shrink-0">
          <SweepButton variant="light"
            className="inline-flex items-center justify-center bg-white text-[14px] font-medium tracking-[-0.04em] px-6 py-3 rounded-3xl"
            onClick={() => { close(); openModal(); }}>
            Let&apos;s talk
          </SweepButton>
        </div>
      </div>
    </div>
  );
}
