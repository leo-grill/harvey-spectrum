export default function Footer() {
  return (
    <footer className="bg-black pt-[48px] px-4 md:px-8" id="contact">

      {/* ── Top: CTA + social links + divider ── */}
      <div className="flex flex-col gap-6 md:gap-[48px]">

        {/* Mobile: stacked col / Desktop: 3-column row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <p className="text-[24px] text-white leading-[1.1] uppercase tracking-[-0.04em]">
              <span className="italic font-light">Have a </span>
              <span className="font-black not-italic">project</span>
              <span className="italic font-light"> in mind?</span>
            </p>
            <button className="border border-white text-white font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-full w-fit">
              Let&apos;s talk
            </button>
          </div>

          {/* Center social (desktop), + X/LinkedIn on mobile */}
          <div className="text-white text-[18px] leading-[1.1] uppercase tracking-[-0.04em] md:text-center">
            <p>Facebook</p>
            <p>Instagram</p>
            <p className="md:hidden">X.com</p>
            <p className="md:hidden">Linkedin</p>
          </div>

          {/* Right social — desktop only */}
          <div className="hidden md:block text-white text-[18px] leading-[1.1] uppercase tracking-[-0.04em] text-right">
            <p>X.com</p>
            <p>Linkedin</p>
          </div>
        </div>

        {/* 1px white divider */}
        <div className="w-full h-px bg-white" />
      </div>

      {/* ── Desktop bottom: oversized H.Studio + legal links ── */}
      <div className="hidden md:flex items-end justify-between mt-[120px]">

        {/* H.Studio cropped container */}
        <div className="relative h-[219px] overflow-hidden flex-1 min-w-0">
          {/* [ Coded By Claude ] vertical label */}
          <div className="absolute left-0 top-0 h-full w-4 flex items-center justify-center">
            <p className="font-mono text-[14px] text-white uppercase whitespace-nowrap -rotate-90">
              [ Coded By Claude ]
            </p>
          </div>
          {/* Giant H.Studio — vertically centered, bottom crops out */}
          <p className="font-semibold capitalize text-[20.14vw] text-white tracking-[-0.06em] leading-[0.8] absolute whitespace-nowrap left-6 top-1/2 -translate-y-[calc(50%-3px)]">
            H.Studio
          </p>
        </div>

        {/* Legal links, bottom-aligned */}
        <div className="flex gap-[34px] pb-8 shrink-0 ml-8">
          <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.03em] whitespace-nowrap">
            Licences
          </a>
          <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.03em] whitespace-nowrap">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* ── Mobile bottom: legal + [ Coded By Claude ] + H.Studio ── */}
      <div className="md:hidden mt-12">
        <div className="flex gap-[34px] justify-center mb-4">
          <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.03em]">
            Licences
          </a>
          <a href="#" className="text-white text-[12px] uppercase underline tracking-[-0.03em]">
            Privacy Policy
          </a>
        </div>
        {/* Cropped container so H.Studio bleeds off the bottom */}
        <div className="overflow-hidden h-[150px] flex flex-col gap-3">
          <p className="font-mono text-[10px] text-white uppercase shrink-0">
            [ Coded By Claude ]
          </p>
          <p className="font-semibold capitalize text-[24.4vw] text-white tracking-[-0.06em] leading-[0.8] whitespace-nowrap shrink-0">
            H.Studio
          </p>
        </div>
      </div>

    </footer>
  );
}
