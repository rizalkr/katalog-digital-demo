import React from "react";
import Link from "next/link";
import { buildNalarSalesWaUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Cara Kerja Katalog Digital — Nalar Solusi Digital",
  description:
    "Pelajari alur pemesanan sederhana dari katalog web hingga pesan otomatis masuk ke WhatsApp bisnis Anda.",
};

export default function CaraKerjaPage() {
  const nalarWaUrl = buildNalarSalesWaUrl();

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg)] text-[var(--ink)]">
      <div className="site-wrap max-w-4xl space-y-16">
        {/* Page Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>←</span>
            <span>Kembali ke Katalog Demo</span>
          </Link>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surface)] text-[var(--ink)]">
            Panduan Edukatif dan Alur Pemesanan
          </span>

          <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-[var(--ink)]">
            Alur pesan via WhatsApp
          </h1>

          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Sistem ini menggabungkan kemudahan katalog visual berbasis web dengan fleksibilitas transaksi via WhatsApp tanpa membebani pelanggan dengan aplikasi tambahan.
          </p>
        </div>

        {/* 3 Step Visual Progression */}
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--surface)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-bold text-[var(--accent)]">
                Langkah 1
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Pilih menu di browser HP
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Pelanggan cukup membuka satu link (di Instagram bio, kartu nama, atau pesan blast). Katalog langsung terbuka cepat tanpa harus unduh aplikasi atau registrasi password.
              </p>
              <ul className="text-xs sm:text-sm text-[var(--ink)] space-y-1.5 pt-2">
                <li>• Filter kategori seketika (makanan berat, frozen, snack, minuman)</li>
                <li>• Pencarian cepat nama hidangan atau bumbu</li>
                <li>• Foto hidangan resolusi tinggi dengan rincian porsi jelas</li>
              </ul>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-48 rounded-2xl bg-[var(--bg)] p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-[var(--accent)]/30 rounded" />
                  <div className="h-5 w-32 bg-[var(--ink)]/20 rounded" />
                  <div className="h-3 w-40 bg-[var(--ink)]/10 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-deep)]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-20 bg-[var(--ink)]/20 rounded" />
                    <div className="h-3 w-12 bg-[var(--accent)]/30 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--surface)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-bold text-[var(--accent)]">
                Langkah 2
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Kumpulkan di keranjang
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Pelanggan memilih varian tingkat pedas atau porsi kemasan, lalu menambahkannya ke keranjang pesanan. Seluruh total belanja dihitung transparan secara instan.
              </p>
              <ul className="text-xs sm:text-sm text-[var(--ink)] space-y-1.5 pt-2">
                <li>• Atur kuantitas porsi langsung dengan tombol plus-minus</li>
                <li>• Pilih varian sambal atau jenis kemasan frozen</li>
                <li>• Kalkulasi subtotal dan grand total rupiah yang akurat</li>
              </ul>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-48 rounded-2xl bg-[var(--bg)] p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-xs font-bold">Keranjang</span>
                  <span className="text-xs text-[var(--muted)]">2 menu</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-xs">
                    <span>Rendang Sapi 500g</span>
                    <span className="font-bold">135.000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Ayam Taliwang (1 Ekor)</span>
                    <span className="font-bold">85.000</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-between text-xs font-bold">
                  <span>Total</span>
                  <span className="text-[var(--accent)]">Rp 220.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--surface)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-bold text-[var(--accent)]">
                Langkah 3
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Checkout ke WhatsApp admin
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Menekan tombol checkout langsung membuka aplikasi WhatsApp pelanggan dengan teks pesanan yang sudah diformat rapi, lengkap dengan nama menu, varian, dan total harga.
              </p>
              <ul className="text-xs sm:text-sm text-[var(--ink)] space-y-1.5 pt-2">
                <li>• Admin dapur tidak perlu mengetik ulang daftar pesanan</li>
                <li>• Mengurangi risiko salah catat menu atau salah harga</li>
                <li>• Langsung sepakati ongkos kirim dan metode transfer perbankan</li>
              </ul>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-48 rounded-2xl bg-emerald-800 text-white p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-2 pb-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold">Dapur Rempah WA</span>
                </div>
                <div className="p-2 rounded bg-emerald-900/60 text-xs space-y-1 leading-tight font-sans">
                  <p className="text-emerald-200">Halo Dapur Rempah,</p>
                  <p>1. Rendang Sapi x1 = 135.000</p>
                  <p>2. Ayam Taliwang x1 = 85.000</p>
                  <p className="font-bold text-white pt-1">Total: Rp 220.000</p>
                </div>
                <div className="text-xs text-emerald-300 text-right">08.15 WIB Terkirim</div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--field-1)] text-[var(--field-1-ink)] text-center space-y-6">
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Ingin menerapkan katalog ini di bisnis Anda?
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Nalar Solusi Digital membantu UMKM dan pelaku kuliner memiliki katalog digital modern dengan integrasi WhatsApp yang mudah dikelola.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="touch-control px-6 py-3 rounded-full bg-white text-[var(--ink)] font-bold text-sm hover:bg-[var(--bg)] transition-colors"
            >
              Coba Langsung Katalog Demo
            </Link>
            <a
              href={nalarWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-control px-6 py-3 rounded-full bg-[var(--nalar-teal)] text-white font-bold text-sm hover:bg-teal-500 transition-colors"
            >
              Hubungi Tim Sales Nalar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
