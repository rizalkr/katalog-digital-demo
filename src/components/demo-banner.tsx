import React from "react";
import Link from "next/link";
import { buildNalarSalesWaUrl } from "@/lib/whatsapp";

export function DemoBanner() {
  const nalarWaUrl = buildNalarSalesWaUrl();

  return (
    <div
      data-ui="demo-banner"
      className="sticky top-0 z-50 w-full bg-[var(--nalar-navy)] text-[var(--nalar-ink)] py-2.5 px-4 text-xs sm:text-sm font-medium"
    >
      <div className="site-wrap flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-white/20 text-white">
            Demo
          </span>
          <p className="text-white/90 text-xs sm:text-sm">
            Ini adalah <strong className="text-white font-semibold">DEMO</strong> oleh Nalar Solusi Digital — seluruh data dan menu bersifat fiktif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cara-kerja"
            className="text-white/80 hover:text-white underline underline-offset-4 text-xs transition-colors hidden md:inline"
          >
            Pelajari Cara Kerja
          </Link>
          <a
            href={nalarWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-control inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--nalar-teal)] text-white text-xs font-semibold hover:bg-teal-500 transition-colors"
          >
            Mau katalog seperti ini?
          </a>
        </div>
      </div>
    </div>
  );
}
