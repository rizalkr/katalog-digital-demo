"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatRupiah } from "@/lib/whatsapp";

export function SiteHeader() {
  const { totalCount, totalAmount, setIsCartOpen } = useCart();

  return (
    <header className="w-full bg-[var(--bg)] sticky top-[39px] sm:top-[41px] z-40 transition-colors">
      <div className="site-wrap flex items-center justify-between h-16 sm:h-20">
        {/* Brand Wordmark */}
        <Link href="/" className="group flex flex-col justify-center">
          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[var(--ink)] leading-none">
            Dapur Rempah
          </span>
          <span className="text-xs text-[var(--muted)] font-medium mt-0.5">
            Nusantara · Katering dan Lauk Frozen
          </span>
        </Link>

        {/* Plain Links */}
        <nav className="hidden md:flex items-center gap-7 text-[var(--ink)] font-medium text-sm">
          <Link
            href="/#katalog"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Katalog Menu
          </Link>
          <Link
            href="/#alur-pesan"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Alur Pesan
          </Link>
          <Link
            href="/cara-kerja"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Cara Kerja Demo
          </Link>
        </nav>

        {/* Primary Action: Cart Drawer Trigger */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="touch-control relative flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-xs sm:text-sm font-semibold hover:opacity-95 transition-opacity"
          aria-label={`Buka Keranjang Pesanan, ${totalCount} menu dipilih`}
        >
          <svg
            className="w-4 h-4 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 6h15l-1.5 9h-12L6 6z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="18" cy="19" r="1.5" />
            <path d="M3 3h3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold">Keranjang</span>
          <span className="tabular-numbers px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">
            {totalCount}
          </span>
          {totalAmount > 0 && (
            <span className="tabular-numbers hidden sm:inline text-xs font-medium pl-1 text-white/90">
              {formatRupiah(totalAmount)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
