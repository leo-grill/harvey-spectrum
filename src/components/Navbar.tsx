"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between py-6 w-full shrink-0">
      <span className="font-semibold text-base tracking-[-0.04em] capitalize text-black">
        H.Studio
      </span>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-14">
        {navLinks.map((link) => (
          <Link
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-semibold text-base tracking-[-0.04em] capitalize text-black hover:opacity-70 transition-opacity"
          >
            {link}
          </Link>
        ))}
      </div>

      {/* Desktop CTA */}
      <Link
        href="#contact"
        className="hidden md:flex items-center justify-center bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-3xl"
      >
        Let&apos;s talk
      </Link>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {open ? (
            <>
              <line
                x1="4" y1="4" x2="20" y2="20"
                stroke="black" strokeWidth="2" strokeLinecap="round"
              />
              <line
                x1="20" y1="4" x2="4" y2="20"
                stroke="black" strokeWidth="2" strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <line
                x1="3" y1="6" x2="21" y2="6"
                stroke="black" strokeWidth="2" strokeLinecap="round"
              />
              <line
                x1="3" y1="12" x2="21" y2="12"
                stroke="black" strokeWidth="2" strokeLinecap="round"
              />
              <line
                x1="3" y1="18" x2="21" y2="18"
                stroke="black" strokeWidth="2" strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </button>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm flex flex-col p-6 gap-5 md:hidden shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-semibold text-base tracking-[-0.04em] capitalize text-black"
              onClick={() => setOpen(false)}
            >
              {link}
            </Link>
          ))}
          <Link
            href="#contact"
            className="flex items-center justify-center bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-3xl w-fit"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </Link>
        </div>
      )}
    </nav>
  );
}
