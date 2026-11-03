"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import {
  buildCartCheckoutWaMessage,
  buildCartCheckoutWaUrl,
  formatRupiah,
} from "@/lib/whatsapp";

export function CartDrawer() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalAmount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [showWaPreview, setShowWaPreview] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const checkoutWaUrl = buildCartCheckoutWaUrl(items);
  const waPreviewMessage = buildCartCheckoutWaMessage(items);

  return (
    <div
      data-ui="cart-drawer"
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Keranjang Pesanan Dapur Rempah"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 bg-[var(--surface)] flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--ink)]">
                Keranjang Pesanan
              </h2>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                {totalCount} hidangan siap checkout ke WhatsApp
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="touch-control p-2 rounded-full hover:bg-[var(--surface-deep)] text-[var(--ink)]"
              aria-label="Tutup Keranjang"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--muted)]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold">Keranjang Masih Kosong</h3>
                <p className="text-sm text-[var(--muted)] mt-1 max-w-[28ch] mx-auto">
                  Pilih menu katering atau lauk frozen favorit Anda di katalog.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[var(--surface)] flex gap-3.5 items-start"
                >
                  <img
                    src={item.product.foto}
                    alt={item.product.nama}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-[var(--surface-deep)]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm text-[var(--ink)] leading-snug line-clamp-1">
                        {item.product.nama}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-1"
                        aria-label={`Hapus ${item.product.nama}`}
                      >
                        Hapus
                      </button>
                    </div>

                    {item.selectedVariant && (
                      <span className="inline-block text-[11px] font-medium text-[var(--accent)] mt-0.5">
                        Varian: {item.selectedVariant}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-[var(--bg)] rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold hover:bg-[var(--surface)] transition-colors"
                          aria-label="Kurangi jumlah"
                        >
                          -
                        </button>
                        <span className="tabular-numbers text-sm font-bold px-1.5 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold hover:bg-[var(--surface)] transition-colors"
                          aria-label="Tambah jumlah"
                        >
                          +
                        </button>
                      </div>

                      <span className="tabular-numbers text-sm font-bold text-[var(--ink)]">
                        {formatRupiah(item.product.harga * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-[var(--surface)] space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-[var(--muted)]">Total Pembayaran:</span>
                <span className="tabular-numbers font-display text-2xl font-bold text-[var(--ink)]">
                  {formatRupiah(totalAmount)}
                </span>
              </div>

              {/* Collapsible WhatsApp Text Preview for Demo Transparency */}
              <div className="rounded-xl p-3 bg-[var(--bg)]">
                <button
                  type="button"
                  onClick={() => setShowWaPreview(!showWaPreview)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
                >
                  <span>Format Pesan Otomatis WhatsApp</span>
                  <span>{showWaPreview ? "Sembunyikan" : "Lihat Format"}</span>
                </button>
                {showWaPreview && (
                  <pre className="mt-2.5 p-2 bg-[var(--surface)] rounded text-[11px] text-[var(--ink)] whitespace-pre-wrap font-sans overflow-x-auto leading-relaxed">
                    {waPreviewMessage}
                  </pre>
                )}
              </div>

              <div className="space-y-2">
                <a
                  href={checkoutWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-control w-full py-3.5 px-4 rounded-xl bg-[var(--accent)] text-[var(--accent-ink)] font-semibold text-center text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                  </svg>
                  <span>Checkout via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full py-2 text-xs font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                >
                  Kosongkan Keranjang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
