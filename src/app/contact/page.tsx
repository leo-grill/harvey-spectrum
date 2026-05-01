"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactModal";

const lbl = "font-mono text-[14px] uppercase leading-[1.1]";

function SuccessState() {
  return (
    <div className="flex flex-col gap-6 py-12">
      <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M1 7L7 13L17 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="font-light text-black tracking-[-0.07em] leading-[0.88] uppercase" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
        Message<br />Received.
      </p>
      <p className="text-[14px] text-black/50 tracking-[-0.02em] leading-[1.5] max-w-[360px]">
        Thank you for reaching out. We&apos;ll be in touch within 48 hours.
      </p>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-black px-4 pt-40 pb-16 md:px-8 md:pt-52 md:pb-24" data-nav-theme="dark">
          <div className="flex items-start justify-between mb-8 md:mb-12">
            <p className={`${lbl} text-white/40`}>[ Contact ] / H.Studio</p>
          </div>
          <h1 className="font-light text-white tracking-[-0.08em] leading-[0.84] uppercase" style={{ fontSize: "clamp(52px, 10.5vw, 140px)" }}>
            Let&apos;s Work<br />Together
          </h1>
        </section>

        {/* Content */}
        <section className="bg-white px-4 py-12 md:px-8 md:py-20">
          <div className="flex flex-col gap-12 md:flex-row md:gap-20 md:items-start">

            {/* Left: contact info */}
            <div className="flex flex-col gap-10 md:w-[300px] shrink-0">
              <div className="flex flex-col gap-4">
                <p className={`${lbl} text-[#1f1f1f]/40`}>[ Get in touch ]</p>
                <p className="text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.02em]">
                  Have a project in mind? Fill out the form and we&apos;ll get back to you within 48 hours. Or just say hello.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className={`${lbl} text-[#1f1f1f]/40 text-[12px]`}>Email</p>
                <a href="mailto:hello@hstudio.com" className="text-[15px] text-black tracking-[-0.02em] hover:opacity-50 transition-opacity">
                  hello@hstudio.com
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className={`${lbl} text-[#1f1f1f]/40 text-[12px]`}>Follow</p>
                {["Instagram", "X.com", "LinkedIn", "Facebook"].map((s) => (
                  <a key={s} href="#" className="text-[14px] font-medium text-black tracking-[-0.02em] hover:opacity-40 transition-opacity w-fit">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-black/10 self-stretch" />

            {/* Right: form */}
            <div className="flex-1 min-w-0">
              {submitted ? (
                <SuccessState />
              ) : (
                <>
                  <p className="font-light text-black tracking-[-0.07em] leading-[0.88] uppercase mb-10" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                    Start Your<br />Next Project
                  </p>
                  <ContactForm onSuccess={() => setSubmitted(true)} />
                </>
              )}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
