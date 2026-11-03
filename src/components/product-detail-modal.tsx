"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import {
  buildSingleProductWaMessage,
  buildSingleProductWaUrl,
  formatRupiah,
} from "@/lib/whatsapp";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [showWaPreview, setShowWaPreview] = useState(false);

  // Set default variant when product opens
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.varian?.[0] || undefined);
      setQuantity(1);
      setShowWaPreview(false);
    }
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && product) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const directWaUrl = buildSingleProductWaUrl(
    product,
    quantity,
    selectedVariant
  );
  const waPreviewText = buildSingleProductWaMessage(
    product,
    quantity,
    selectedVariant
  );

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail ${product.nama}`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[var(--bg)] text-[var(--ink)] rounded-3xl overflow-hidden shadow-2xl z-10 border border-[var(--surface-deep)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="touch-control absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[var(--bg)]/90 text-[var(--ink)] hover:bg-[var(--surface)] transition-colors shadow-sm"
          aria-label="Tutup jendela detail"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Media Frame */}
        <div className="relative h-64 sm:h-72 w-full bg-[var(--surface-deep)] overflow-hidden">
          <img
            src={product.foto}
            alt={product.nama}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-4 bg-[var(--ink)]/80 text-[var(--bg)] px-3 py-1 rounded-full text-xs font-semibold">
            {product.kategori}
          </div>
          {product.porsi && (
            <div className="absolute bottom-3 right-4 bg-white/90 text-[var(--ink)] px-3 py-1 rounded-full text-xs font-medium">
              {product.porsi}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                {product.nama}
              </h2>
              <span className="tabular-numbers font-display text-2xl font-bold text-[var(--accent)] flex-shrink-0">
                {formatRupiah(product.harga)}
              </span>
            </div>
            <p className="text-[var(--muted)] text-sm sm:text-base mt-2 leading-relaxed">
              {product.deskripsi}
            </p>
          </div>

          {/* Variant Selector */}
          {product.varian && product.varian.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Pilih Varian
              </label>
              <div className="flex flex-wrap gap-2">
                {product.varian.map((variant) => {
                  const isSelected = selectedVariant === variant;
                  return (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`touch-control px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                          : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-deep)]"
                      }`}
                    >
                      {variant}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Live Subtotal */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--surface)]">
            <span className="text-sm font-semibold text-[var(--muted)]">Jumlah Pesan:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[var(--surface)] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-[var(--surface-deep)]"
                  aria-label="Kurangi jumlah"
                >
                  -
                </button>
                <span className="tabular-numbers text-sm font-bold px-3 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-[var(--surface-deep)]"
                  aria-label="Tambah jumlah"
                >
                  +
                </button>
              </div>
              <span className="tabular-numbers text-base font-bold text-[var(--ink)]">
                {formatRupiah(product.harga * quantity)}
              </span>
            </div>
          </div>

          {/* Collapsible WhatsApp Preview */}
          <div className="rounded-xl p-3 bg-[var(--surface)] text-xs">
            <button
              type="button"
              onClick={() => setShowWaPreview(!showWaPreview)}
              className="w-full flex items-center justify-between font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <span>Pratinjau Pesan WhatsApp Otomatis</span>
              <span>{showWaPreview ? "Sembunyikan ▲" : "Lihat Format ▼"}</span>
            </button>
            {showWaPreview && (
              <pre className="mt-2 p-2.5 bg-[var(--bg)] rounded-lg text-[11px] text-[var(--ink)] whitespace-pre-wrap font-sans leading-relaxed border-none">
                {waPreviewText}
              </pre>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-control py-3.5 px-4 rounded-xl bg-[var(--accent)] text-[var(--accent-ink)] font-semibold text-center text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
              </svg>
              <span>Pesan via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleAddToCart}
              className="touch-control py-3.5 px-4 rounded-xl bg-[var(--ink)] text-[var(--bg)] font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>+ Masukkan Keranjang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
