"use client";

import Link from "next/link";
import SweepButton from "./SweepButton";
import { useContactModal } from "./ContactModal";

export default function Footer() {
  const { openModal } = useContactModal();
  return (
    <footer className="bg-black overflow-hidden pt-10 md:pt-12 px-6 md:px-8" id="contact" data-nav-theme="dark">

      {/* ── Top row ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div className="flex flex-col gap-4">
          <p className="text-white leading-[1.15] uppercase tracking-[-0.02em] text-[20px] md:text-[22px]">
            <span className="italic font-light">Have a </span>
            <span className="font-black not-italic">Project</span>
            <span className="italic font-light"> in mind?</span>
          </p>
          <SweepButton className="border border-white font-medium text-[13px] tracking-[-0.02em] px-5 py-2.5 rounded-full w-fit" onClick={openModal}>
            Let&apos;s talk
          </SweepButton>
        </div>

        {/* Desktop: two social columns */}
        <div className="hidden md:flex flex-col gap-1.5">
          {["Facebook", "Instagram"].map((s) => (
            <Link key={s} href="#"
              className="text-white text-[11px] font-semibold tracking-[0.09em] uppercase hover:opacity-60 transition-opacity">
              {s}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex flex-col gap-1.5">
          {["X.com", "LinkedIn"].map((s) => (
            <Link key={s} href="#"
              className="text-white text-[11px] font-semibold tracking-[0.09em] uppercase hover:opacity-60 transition-opacity">
              {s}
            </Link>
          ))}
        </div>

        {/* Mobile: all socials stacked */}
        <div className="flex md:hidden flex-col gap-2 mt-1">
          {["Facebook", "Instagram", "X.com", "LinkedIn"].map((s) => (
            <Link key={s} href="#"
              className="text-white text-[13px] font-semibold tracking-[0.07em] uppercase hover:opacity-60 transition-opacity">
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-white/25 mt-8 md:mt-10" />

      {/* ── Mobile: legal + coded by + H.Studio ── */}
      <div className="md:hidden mt-8">
        <div className="flex gap-6 justify-center mb-4">
          <Link href="#" className="text-white/70 text-[11px] font-medium uppercase underline underline-offset-2 tracking-[0.05em] hover:opacity-60 transition-opacity">
            Licences
          </Link>
          <Link href="#" className="text-white/70 text-[11px] font-medium uppercase underline underline-offset-2 tracking-[0.05em] hover:opacity-60 transition-opacity">
            Privacy Policy
          </Link>
        </div>
        <p className="font-mono text-white/40 text-[10px] uppercase tracking-[0.12em] mb-1">
          [ Coded by Claude ]
        </p>
        {/* Break out of px-6 so H.Studio can use full viewport width */}
        <div className="-mx-6">
          <p
            className="font-black text-white leading-[0.82] whitespace-nowrap pl-6"
            style={{ fontSize: "21.5vw" }}
          >
            H.Studio
          </p>
        </div>
      </div>

      {/* ── Desktop: rotated label + H.Studio (full flex-1) + legal inside ── */}
      <div className="hidden md:flex items-end mt-14">

        {/* Rotated [ CODED BY CLAUDE ] */}
        <div className="flex items-center justify-center shrink-0 w-7 self-stretch pb-2">
          <p
            className="font-mono text-white/40 text-[10px] uppercase tracking-[0.12em] whitespace-nowrap"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            [ Coded by Claude ]
          </p>
        </div>

        {/* H.Studio — takes ALL remaining width, legal links sit inside it */}
        <div className="relative flex-1 min-w-0">
          <p
            className="font-black text-white leading-[0.82] whitespace-nowrap"
            style={{ fontSize: "21vw" }}
          >
            H.Studio
          </p>
          <div className="absolute bottom-3 right-0 flex gap-7">
            <Link href="#" className="text-white/70 text-[11px] font-medium uppercase underline underline-offset-2 tracking-[0.05em] hover:opacity-60 transition-opacity whitespace-nowrap">
              Licences
            </Link>
            <Link href="#" className="text-white/70 text-[11px] font-medium uppercase underline underline-offset-2 tracking-[0.05em] hover:opacity-60 transition-opacity whitespace-nowrap">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
