"use client";

import React, { useMemo, useState } from "react";
import { Product, ProductCategory } from "@/lib/types";
import { formatRupiah } from "@/lib/whatsapp";
import { useCart } from "@/context/cart-context";
import { ProductDetailModal } from "./product-detail-modal";

interface CatalogSectionProps {
  products: Product[];
}

const CATEGORIES: ("Semua" | ProductCategory)[] = [
  "Semua",
  "Makanan Berat",
  "Frozen",
  "Snack",
  "Minuman",
];

export function CatalogSection({ products }: CatalogSectionProps) {
  const { addItem, animateFlyToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<"Semua" | ProductCategory>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const handleQuickAdd = (product: Product, el: HTMLElement) => {
    animateFlyToCart(el, product.foto);
    addItem(product, 1, product.varian ? product.varian[0] : undefined);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "Semua" || product.kategori === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        product.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const groupedProducts = useMemo(() => {
    if (selectedCategory !== "Semua" || searchQuery.trim() !== "") {
      return null;
    }
    const groups: { category: ProductCategory; items: Product[] }[] = [];
    const validCategories: ProductCategory[] = [
      "Makanan Berat",
      "Frozen",
      "Snack",
      "Minuman",
    ];

    validCategories.forEach((cat) => {
      const items = products.filter((p) => p.kategori === cat);
      if (items.length > 0) {
        groups.push({ category: cat, items });
      }
    });

    return groups;
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="katalog" className="py-16 sm:py-24 bg-[var(--bg)]">
      <div className="site-wrap">
        {/* Section Heading & Framing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6">
          <div>
            <h2 className="font-display font-bold text-[var(--ink)]">
              Katalog hidangan
            </h2>
            <p className="text-[var(--muted)] text-base sm:text-lg mt-2 max-w-prose">
              Contoh: 15 menu katering harian dan lauk ungkep beku. Klik foto untuk memilih varian atau pesan langsung ke WhatsApp.
            </p>
          </div>
          <div className="text-sm font-semibold text-[var(--muted)] tabular-numbers">
            Menampilkan {filteredProducts.length} menu siap pesan
          </div>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 p-3 sm:p-4 rounded-3xl bg-[var(--surface)]">
          {/* Client-side Search Input */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari hidangan (contoh: rendang, sate, wedang)..."
              className="touch-control w-full pl-11 pr-4 py-2.5 rounded-full bg-[var(--bg)] text-[var(--ink)] text-sm font-medium placeholder:text-[var(--muted)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] border-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-[var(--ink)] p-1"
                aria-label="Bersihkan pencarian"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`touch-control whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                      : "bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--surface-deep)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[var(--surface)] p-8">
            <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
              Menu Tidak Ditemukan
            </h3>
            <p className="text-[var(--muted)] text-base mt-2 max-w-sm mx-auto">
              Tidak ada menu yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba nama bumbu atau menu lainnya.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="touch-control mt-6 px-6 py-2.5 rounded-full bg-[var(--ink)] text-[var(--bg)] text-sm font-semibold hover:opacity-90"
            >
              Tampilkan Seluruh Menu
            </button>
          </div>
        ) : groupedProducts ? (
          /* Render by Category Groups */
          <div className="space-y-16">
            {groupedProducts.map((group) => (
              <div key={group.category} className="space-y-6">
                <div className="flex items-baseline justify-between pb-3">
                  <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
                    {group.category}
                  </h3>
                  <span className="text-xs font-semibold text-[var(--muted)] tabular-numbers">
                    Contoh: {group.items.length} menu
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                  {group.items.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      onSelect={() => setActiveModalProduct(product)}
                      onQuickAdd={(el) => handleQuickAdd(product, el)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Render Flat Filtered Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onSelect={() => setActiveModalProduct(product)}
                onQuickAdd={(el) => handleQuickAdd(product, el)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}

interface ProductRowProps {
  product: Product;
  onSelect: () => void;
  onQuickAdd: (el: HTMLElement) => void;
}

function ProductRow({ product, onSelect, onQuickAdd }: ProductRowProps) {
  return (
    <div className="group relative flex gap-4 sm:gap-5 p-4 rounded-3xl transition-colors hover:bg-[var(--surface)]">
      {/* Circular Dish Photograph Mask (Cobek Motif) */}
      <button
        type="button"
        onClick={onSelect}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 bg-[var(--surface-deep)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        aria-label={`Lihat detail ${product.nama}`}
      >
        <img
          src={product.foto}
          alt={product.nama}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </button>

      {/* Details & Actions */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onSelect}
              className="text-left font-display text-base sm:text-lg font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors line-clamp-1"
            >
              {product.nama}
            </button>
            <span className="tabular-numbers font-display text-base sm:text-lg font-bold text-[var(--accent)] flex-shrink-0">
              {formatRupiah(product.harga)}
            </span>
          </div>

          <p className="text-[var(--muted)] text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
            {product.deskripsi}
          </p>

          {product.varian && (
            <p className="text-xs font-medium text-[var(--muted)] mt-1.5 line-clamp-1">
              Varian: {product.varian.join(" · ")}
            </p>
          )}
        </div>

        {/* Buttons Row */}
        <div className="flex items-center gap-2 mt-4 pt-2">
          <button
            type="button"
            onClick={onSelect}
            className="touch-control px-4 py-2 rounded-full bg-[var(--surface-deep)] text-[var(--ink)] text-xs font-semibold hover:bg-[var(--muted)] hover:text-white transition-colors"
          >
            Detail & Pesan
          </button>
          <button
            type="button"
            onClick={(e) => onQuickAdd(e.currentTarget)}
            className="touch-control px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--bg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            aria-label={`Tambah ${product.nama} ke keranjang`}
          >
            <span>+</span>
            <span>Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
}
