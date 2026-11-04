import React from "react";
import Link from "next/link";
import { buildNalarSalesWaUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const nalarWaUrl = buildNalarSalesWaUrl();

  return (
    <footer className="w-full bg-[var(--field-1)] text-[var(--field-1-ink)] py-16 sm:py-24 pb-28 sm:pb-24">
      <div className="site-wrap space-y-16">
        {/* The Mark, Built Large: Block construction wordmark */}
        <div className="w-full">
          <div className="flex items-center justify-between pb-6">
            <span className="font-display font-bold text-3xl sm:text-5xl lg:text-7xl tracking-tighter text-white">
              DAPUR REMPAH
            </span>
            <span className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white/80 hidden sm:inline">
              Nusantara
            </span>
          </div>
        </div>

        {/* 4 Columns of information and credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Col 1: About the Demo */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white">
              Tentang Demo
            </h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Website ini adalah demonstrasi interaktif solusi <strong>Katalog Digital + Order via WhatsApp</strong> yang dibangun oleh <strong>Nalar Solusi Digital</strong> untuk sektor kuliner dan UMKM.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/#katalog" className="hover:text-white transition-colors">
                  Katalog Hidangan
                </Link>
              </li>
              <li>
                <Link href="/#alur-pesan" className="hover:text-white transition-colors">
                  Alur Pemesanan
                </Link>
              </li>
              <li>
                <Link href="/cara-kerja" className="hover:text-white transition-colors">
                  Cara Kerja & Simulasi WA
                </Link>
              </li>
              <li>
                <a
                  href={nalarWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Hubungi Nalar Solusi Digital
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kitchen & Delivery Hours (Sample) */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white">
              Jadwal Dapur (Contoh)
            </h3>
            <div className="text-xs sm:text-sm text-white/70 space-y-1.5 leading-relaxed">
              <p>Pengiriman Katering: 08.00 – 17.00 WIB</p>
              <p>Pemesanan Frozen: Siap kirim H+1</p>
              <p className="text-white/50 pt-2 text-xs">
                *Seluruh jadwal di atas adalah contoh simulasi operasional.
              </p>
            </div>
          </div>

          {/* Col 4: Image & Asset Credits */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white">
              Kredit Aset dan Lisensi
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Foto kuliner pada website ini menggunakan foto bebas lisensi komersial dari fotografer Unsplash: Devin Rajaram, Annie Spratt, Dominik Martin, dan Martin Wessely.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Nalar CTA Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Nalar Solusi Digital. Dapur Rempah Nusantara adalah merk demo fiktif.</p>
          <a
            href={nalarWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-control px-4 py-2 rounded-full bg-[var(--nalar-teal)] text-white font-semibold hover:bg-teal-500 transition-colors"
          >
            Konsultasi Katalog dengan Nalar
          </a>
        </div>
      </div>
    </footer>
  );
}
