"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

/**
 * variant="dark"  — black bg / white text → white fill sweeps in, text → black
 * variant="light" — white bg / black text → black fill sweeps in, text → white
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  href?: string;
  onClick?: () => void;
};

export default function SweepButton({
  children,
  className = "",
  variant = "dark",
  href,
  onClick,
}: Props) {
  const fillRef  = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const fillColor  = variant === "dark" ? "#ffffff" : "#000000";
  const hoverText  = variant === "dark" ? "#000000" : "#ffffff";
  const initialText = variant === "dark" ? "#ffffff" : "#000000";

  const onEnter = () => {
    gsap.to(fillRef.current,  { scaleX: 1,         duration: 0.4,  ease: "power3.out" });
    gsap.to(labelRef.current, { color: hoverText,  duration: 0.2,  ease: "none", delay: 0.1 });
  };

  const onLeave = () => {
    gsap.to(fillRef.current,  { scaleX: 0,           duration: 0.35, ease: "power3.in" });
    gsap.to(labelRef.current, { color: initialText,  duration: 0.15, ease: "none" });
  };

  const inner = (
    <>
      <span
        ref={fillRef}
        className="absolute inset-0 rounded-[inherit] origin-left pointer-events-none"
        style={{ backgroundColor: fillColor, transform: "scaleX(0)" }}
      />
      <span ref={labelRef} className="relative z-10" style={{ color: initialText }}>
        {children}
      </span>
    </>
  );

  const sharedProps = {
    className: `relative overflow-hidden cursor-pointer ${className}`,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onClick,
  };

  if (href) {
    return <Link href={href} {...sharedProps}>{inner}</Link>;
  }
  return <button type="button" {...sharedProps}>{inner}</button>;
}
