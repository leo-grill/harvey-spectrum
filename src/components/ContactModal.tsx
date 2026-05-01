"use client";

import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

// ── Context ────────────────────────────────────────────────────────────────

interface ModalCtx { openModal: () => void; closeModal: () => void; }
const ContactModalContext = createContext<ModalCtx>({ openModal: () => {}, closeModal: () => {} });
export const useContactModal = () => useContext(ContactModalContext);

// ── Shared form ────────────────────────────────────────────────────────────

const SERVICE_OPTIONS = ["Brand Discovery", "Web Design & Dev", "Marketing", "Photography", "Other"];

const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none py-2.5 text-[15px] tracking-[-0.02em] bg-transparent transition-colors placeholder:text-black/25";

const labelClass = "font-mono text-[11px] uppercase tracking-[0.08em] text-black/40";

export function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const set = (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with your form endpoint (Formspree, Resend, etc.)
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Name</label>
        <input required value={form.name} onChange={set("name")} className={inputClass} placeholder="Your name" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Email</label>
        <input required type="email" value={form.email} onChange={set("email")} className={inputClass} placeholder="your@email.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Service</label>
        <select value={form.service} onChange={set("service")} className={inputClass}>
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Message</label>
        <textarea required value={form.message} onChange={set("message")} rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
      </div>
      <button
        type="submit"
        className="relative overflow-hidden bg-black text-white font-medium text-[14px] tracking-[-0.02em] px-7 py-3.5 rounded-full w-fit mt-1 hover:opacity-80 transition-opacity"
      >
        Send Message →
      </button>
    </form>
  );
}

// ── Success state ──────────────────────────────────────────────────────────

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-start justify-center gap-5 px-8 py-12">
      <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center mb-2">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1 6L6 11L15 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="font-light text-black tracking-[-0.07em] leading-[0.88] uppercase" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
        Message<br />Received.
      </p>
      <p className="text-[14px] text-black/50 tracking-[-0.02em] leading-[1.5] max-w-[320px]">
        Thank you for reaching out. We&apos;ll be in touch within 48 hours.
      </p>
      <button onClick={onClose} className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-black/30 hover:text-black transition-colors underline underline-offset-4">
        Close
      </button>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────

function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const panel    = panelRef.current;
    if (!backdrop || !panel) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(backdrop, { pointerEvents: "auto" });
      gsap.to(backdrop,  { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.55, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(backdrop, { opacity: 0, pointerEvents: "none", duration: 0.3 });
      gsap.to(panel, {
        xPercent: 100, duration: 0.4, ease: "power3.in",
        onComplete: () => setSubmitted(false),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[500]" style={{ pointerEvents: "none" }}>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0"
        style={{ pointerEvents: "none" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 bottom-0 w-full md:w-[520px] bg-white flex flex-col shadow-2xl"
        style={{ pointerEvents: "auto" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-black/10 shrink-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-black/40">[ Let&apos;s Talk ]</p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:opacity-40 transition-opacity"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <SuccessState onClose={onClose} />
        ) : (
          <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
            <p className="font-light text-black tracking-[-0.07em] leading-[0.88] uppercase" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>
              Start Your<br />Next Project
            </p>
            <ContactForm onSuccess={() => setSubmitted(true)} />
          </div>
        )}

        {/* Footer */}
        {!submitted && (
          <div className="px-8 py-5 border-t border-black/10 flex gap-6 shrink-0">
            {["Instagram", "X.com", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/25 hover:text-black transition-colors">
                {s}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Provider ───────────────────────────────────────────────────────────────

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal  = useCallback(() => setIsOpen(true),  []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}
