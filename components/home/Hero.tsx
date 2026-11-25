"use client";

import Image from "next/image";

/* ── Hero ───────────────────────────────────────────────────── */
export function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* ── Background portrait ───────────────────────────────── */}
      <Image
        src="/portrait.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_calc(50%+300px)] grayscale lg:scale-[1.2]"
        aria-hidden
      />
      {/* Dark scrim so white text stays readable over the photo */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      {/* ── UI layer ─────────────────────────────────────────── */}
      <div
        className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14 pt-16"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >

        {/* ── FOUR-COLUMN META GRID ──────────────────────────── */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Col 1 — What I Do */}
          <div>
            <p className="font-pixel text-base tracking-widest text-white/50 uppercase mb-6">
              What I Do
            </p>
            <p className="text-sm text-white/90 leading-relaxed max-w-[220px]">
              I turn ideas into beautiful, functional and scalable softwares, i share my ideas through writting and transfer my knowledge through teaching
            </p>
          </div>

          {/* Col 2 — Services */}
          <div className="text-right" style={{ marginRight: "20px" }}>
            <p className="font-pixel text-base tracking-widest text-white/50 uppercase mb-6">
              Services
            </p>
            <ul className="text-sm text-white/90 leading-relaxed space-y-0.5">
              <li>Web development</li>
              <li>Mobile app development</li>
              <li>Database management</li>
              <li>Deployments</li>
              <li>Product ownership and management</li>
              <li>Mentorship</li>
            </ul>
          </div>
        </div>


      </div>
    </div>
  );
}

/* ── Ticker (kept for backward-compat export) ───────────────── */
export function Ticker() {
  return null;
}
