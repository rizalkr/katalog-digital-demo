"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { buildNalarSalesWaUrl } from "@/lib/whatsapp";

export function ActionTileSection() {
  const { setIsCartOpen } = useCart();
  const nalarWaUrl = buildNalarSalesWaUrl();

  return (
    <section id="kontak" className="py-20 sm:py-28 bg-[var(--bg)]">
      <div className="site-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-h-[380px]">
          {/* Flanking Left Tile: Photography */}
          <div className="hidden lg:block lg:col-span-3 rounded-3xl overflow-hidden bg-[var(--surface-deep)] relative">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
              alt="Penyajian katering rempah"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Center Tile: Primary Action in Accent Color */}
          <div className="lg:col-span-6 rounded-3xl bg-[var(--accent)] text-[var(--accent-ink)] p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 mb-4">
                Pesan Mudah & Transparan
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight text-white">
                Siap menyusun pesanan
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                Buka keranjang untuk mengirim pesanan menu katering atau stok lauk beku langsung ke WhatsApp dapur kami.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="touch-control px-6 py-3.5 rounded-full bg-white text-[var(--ink)] font-bold text-sm hover:bg-[var(--bg)] transition-colors shadow-sm text-center"
              >
                Buka Keranjang Belanja
              </button>
              <a
                href={nalarWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-control px-6 py-3.5 rounded-full bg-[var(--ink)] text-white font-bold text-sm hover:opacity-90 transition-opacity text-center"
              >
                Konsultasi Demo Nalar
              </a>
            </div>
          </div>

          {/* Flanking Right Tile: Clove Accent Tone */}
          <div className="hidden lg:flex lg:col-span-3 rounded-3xl bg-[var(--field-1)] text-[var(--field-1-ink)] p-8 flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Catatan Dapur
              </span>
              <p className="font-display text-xl font-bold mt-2 text-white">
                Pesanan Masuk Langsung ke WhatsApp
              </p>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Tanpa potongan komisi aplikasi ojek online, langsung terhubung dengan admin dapur Anda.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-xs font-medium text-white/60">
              Dapur Rempah Nusantara · Demo Nalar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
