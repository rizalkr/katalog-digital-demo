import React from "react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full bg-[var(--bg)] overflow-hidden py-14 sm:py-20 lg:py-28">
      {/* Giant Cropped Motif: Dual Circles representing fresh catering and vacuum-packed frozen */}
      <div
        className="absolute -right-24 sm:-right-16 top-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] lg:w-[680px] h-[340px] sm:h-[540px] lg:h-[680px] rounded-full bg-[var(--surface)] pointer-events-none opacity-80"
        aria-hidden="true"
      />
      <div
        className="absolute -right-8 sm:right-12 bottom-4 w-[220px] sm:w-[360px] lg:w-[440px] h-[220px] sm:h-[360px] lg:h-[440px] rounded-full bg-[var(--surface-deep)] pointer-events-none opacity-50"
        aria-hidden="true"
      />

      <div className="site-wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Columns 1–6: Display Headline, Support Line, and Action Button */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface)] text-[var(--ink)]">
              Katering Harian dan Lauk Ungkep Beku
            </span>

            {/* Strict Two-Line Headline Rule: 22 chars */}
            <h1 className="font-display font-bold text-[var(--ink)] tracking-tighter">
              Rempah utuh setiap hari
            </h1>

            {/* Supporting sentence: says concretely what it is without fluff */}
            <p className="text-[var(--muted)] text-base sm:text-lg lg:text-xl max-w-prose leading-relaxed">
              Katering rumahan dan lauk ungkep beku dari Dapur Rempah Nusantara, diracik segar lalu dipesan langsung lewat WhatsApp tanpa aplikasi tambahan.
            </p>

            {/* Actions: Primary button and secondary plain link */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#katalog"
                className="touch-control px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-sm sm:text-base hover:opacity-95 transition-opacity text-center inline-flex items-center gap-2"
              >
                <span>Lihat Katalog</span>
                <span className="text-lg leading-none">↓</span>
              </a>

              <Link
                href="/cara-kerja"
                className="touch-control px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface)] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Alur Pemesanan</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Columns 7–12: Hero Visual masked inside Cobek Circular Geometry with Shutter Image effect */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden bg-[var(--surface-deep)]">
              <img
                src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80"
                alt="Sajian Ayam Bakar Bumbu Rempah Taliwang Dapur Rempah"
                className="w-full h-full object-cover shutter-image"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
