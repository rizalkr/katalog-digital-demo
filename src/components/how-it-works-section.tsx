"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Stage {
  id: string;
  title: string;
  summary: string;
  detail: string;
  tag: string;
  bgClass: string;
  textClass: string;
}

const STAGES: Stage[] = [
  {
    id: "stage-1",
    title: "Pilih menu dan varian",
    tag: "Langkah 1",
    summary: "Pelanggan membuka katalog langsung dari link bio atau tautan pesan.",
    detail:
      "Tanpa instal aplikasi dan tanpa registrasi akun yang rumit. Pelanggan dapat melihat foto resolusi tinggi, rincian bumbu rempah, porsi katering, dan memilih varian tingkat kepedasan langsung di browser ponsel mereka.",
    bgClass: "bg-[#45271a]",
    textClass: "text-[#f3efe8]",
  },
  {
    id: "stage-2",
    title: "Periksa isi keranjang",
    tag: "Langkah 2",
    summary: "Atur porsi dan lihat kalkulasi total harga transparan seketika.",
    detail:
      "Pelanggan dapat menambah, mengurangi, atau mengganti pilihan menu di dalam drawer keranjang belanja. Seluruh subtotal dan total biaya dihitung secara otomatis dan akurat sebelum diteruskan ke kasir.",
    bgClass: "bg-[#7c3d28]",
    textClass: "text-[#f3efe8]",
  },
  {
    id: "stage-3",
    title: "Kirim ke WhatsApp",
    tag: "Langkah 3",
    summary: "Satu klik tombol membuka chat WhatsApp dengan format teks rapi.",
    detail:
      "Daftar pesanan, rincian varian, jumlah, dan nominal pembayaran langsung terisi otomatis di aplikasi WhatsApp pembeli. Tim admin katering Anda tinggal menyapa pelanggan dan memproses ongkir tanpa salah catat menu.",
    bgClass: "bg-[#a6563d]",
    textClass: "text-[#f3efe8]",
  },
];

export function HowItWorksSection() {
  const [activeStageId, setActiveStageId] = useState("stage-1");

  return (
    <section id="alur-pesan" className="py-20 sm:py-28 bg-[var(--surface)] text-[var(--ink)]">
      <div className="site-wrap">
        {/* Two-column Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 items-baseline">
          <div className="lg:col-span-5">
            <h2 className="font-display font-bold text-[var(--ink)]">
              Tiga langkah pesan
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
              Katalog Digital Nalar dirancang agar proses pemesanan makanan semudah membuka menu di restoran, namun langsung tersambung ke WhatsApp bisnis Anda.
            </p>
          </div>
        </div>

        {/* Tinted Accordion Panels (Horizontal Desktop / Stacked Mobile) */}
        <div className="flex flex-col lg:flex-row min-h-[460px] rounded-3xl overflow-hidden">
          {STAGES.map((stage) => {
            const isActive = activeStageId === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`transition-colors duration-300 cursor-pointer flex flex-col justify-between p-7 sm:p-9 ${
                  stage.bgClass
                } ${stage.textClass} ${
                  isActive
                    ? "lg:flex-[2.5]"
                    : "lg:flex-1 opacity-90 hover:opacity-100"
                }`}
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/15 mb-4">
                    {stage.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                    {stage.title}
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  <p className="text-sm sm:text-base opacity-90 font-medium">
                    {stage.summary}
                  </p>
                  {isActive && (
                    <p className="text-xs sm:text-sm opacity-80 leading-relaxed pt-3">
                      {stage.detail}
                    </p>
                  )}
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between text-xs font-semibold opacity-75">
                  <span>{isActive ? "Tahap Aktif" : "Klik untuk membaca detail"}</span>
                  <span className="text-base">{isActive ? "●" : "→"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Link to Full /cara-kerja */}
        <div className="mt-8 text-center sm:text-right">
          <Link
            href="/cara-kerja"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:underline underline-offset-4"
          >
            <span>Buka panduan interaktif lengkap di halaman Cara Kerja</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
