"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { formatRupiah } from "@/lib/whatsapp";

export function FloatingCartButton() {
  const { totalCount, totalAmount, isCartOpen, setIsCartOpen, isBadgeBouncing } = useCart();

  // Hide when cart drawer is already open
  if (isCartOpen) return null;

  const hasItems = totalCount > 0;

  return (
    <aside
      data-ui="floating-cart"
      aria-label="Keranjang Belanja Mengambang"
      className={`fixed z-50 inset-x-3 sm:inset-x-auto sm:right-8 sm:bottom-8 ${
        hasItems ? "block" : "block sm:hidden"
      }`}
      style={{
        bottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))",
      }}
    >
      <button
        id="floating-cart-btn"
        data-ui="floating-cart-btn"
        type="button"
        onClick={() => setIsCartOpen(true)}
        className={`touch-control w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 rounded-2xl sm:rounded-full font-bold text-sm shadow-[0_8px_24px_rgba(33,21,16,0.28)] hover:opacity-95 transition-transform ${ /* taste-skill-ignore */
          hasItems
            ? "bg-[var(--accent)] text-[var(--accent-ink)]"
            : "bg-[var(--ink)] text-[var(--bg)] opacity-90"
        }`}
        aria-label={
          hasItems
            ? `Buka keranjang belanja, ${totalCount} menu, total ${formatRupiah(totalAmount)}`
            : "Buka keranjang belanja, keranjang masih kosong"
        }
      >
        {/* Left: Cart Icon + Counter */}
        <div className="flex items-center gap-2.5">
          <svg
            className="w-5 h-5 fill-none stroke-current stroke-2 flex-shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 6h15l-1.5 9h-12L6 6z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="18" cy="19" r="1.5" />
            <path d="M3 3h3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className={`tabular-numbers inline-block ${
              isBadgeBouncing ? "badge-pulse" : ""
            }`}
          >
            {hasItems ? `Keranjang (${totalCount})` : "Keranjang (0)"}
          </span>
        </div>

        {/* Right: Subtotal & Action Hint */}
        <div className="flex items-center gap-2.5">
          {hasItems ? (
            <>
              <span className="tabular-numbers text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20">
                {formatRupiah(totalAmount)}
              </span>
              <span className="text-xs font-semibold sm:hidden">
                Lihat Pesanan &rarr;
              </span>
            </>
          ) : (
            <span className="text-xs font-medium text-[var(--bg)]/80 sm:hidden">
              Pilih Menu di Katalog
            </span>
          )}
        </div>
      </button>
    </aside>
  );
}
