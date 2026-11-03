# PRD: Demo Site Katalog Digital — Nalar Solusi Digital

> Dokumen ini adalah brief lengkap untuk membangun DEMO SITE Katalog Digital dalam SATU sesi Antigravity.
> Paste seluruh isi dokumen ini sebagai prompt. Jangan tambahkan konteks repo lain.

## 1. Tujuan

Membangun website demo interaktif yang menunjukkan ke calon klien seperti apa **Katalog Digital + Order via WhatsApp** buatan Nalar Solusi Digital. Demo ini dipakai tim sales saat presentasi dan di-embed/dilink dari website utama Nalar.

**Bukan** website jualan beneran — semua data fiktif dan wajib diberi label DEMO yang jelas.

## 2. Bisnis Fiktif Demo

- **Nama:** Dapur Rempah Nusantara (fiktif — katering & frozen food)
- **Alasan pilih kuliner:** mayoritas prospek Nalar dari sektor kuliner; katalog makanan paling mudah dipahami.
- **Aturan keras:** TIDAK boleh ada testimoni palsu, TIDAK boleh ada klaim ("terlaris", "1000+ pelanggan puas", dsb). Semua angka = contoh ("contoh: 24 menu").

## 3. Tech Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS — sama seperti website utama Nalar.
- Data produk: file JSON statis di `data/products.json` (TIDAK perlu database untuk demo).
- TIDAK perlu login/auth.
- Deploy: Vercel (atau static export bila lebih mudah).

## 4. Struktur Halaman & Fitur (MVP Demo)

### 4a. Halaman utama (`/`)
1. **Banner DEMO** (sticky, paling atas, tidak bisa di-dismiss): "Ini adalah DEMO oleh Nalar Solusi Digital — data fiktif." + tombol "Mau katalog seperti ini?" → link WA Nalar (`https://wa.me/6281529964902?text=...`).
2. **Hero:** nama bisnis fiktif + tagline + foto hero (pakai placeholder/gambar bebas lisensi) + tombol "Lihat Katalog".
3. **Kategori:** chip filter (Semua, Makanan Berat, Snack, Frozen, Minuman).
4. **Grid produk:** kartu berisi foto, nama, harga, tombol "+ Keranjang" / "Pesan".
5. **Pencarian:** search box filter nama produk (client-side).

### 4b. Detail produk (klik kartu)
- Foto besar, deskripsi singkat, harga, pilihan varian (mis. level pedas / ukuran) bila ada.
- Tombol "Pesan via WhatsApp" → buka `wa.me/<nomor-demo>` dengan teks terisi otomatis: "Halo, saya mau pesan [nama produk] x[jumlah]".

### 4c. Keranjang sederhana
- Drawer/sidebar: daftar item, ubah jumlah, hapus, total harga.
- Tombol "Checkout via WhatsApp" → kirim seluruh isi keranjang sebagai SATU pesan WA terformat rapi.

### 4d. Halaman "Cara Kerja" (`/cara-kerja`) — opsional bila sempat
- 3 langkah bergambar: Pilih produk → Checkout via WA → Pesanan diproses. Edukatif, bukan hard-selling.

## 5. Data Dummy (`data/products.json`)

- Minimal 12 produk, tiap produk: `id`, `nama`, `kategori`, `harga` (number, Rupiah), `deskripsi` (1 kalimat), `foto` (URL placeholder), `varian` (opsional, array).
- Contoh: "Ayam Goreng Rempah (1 ekor)", 85000; "Rendang Sapi 500g", 120000; "Kue Lapis Pelangi", 25000; dst. Buat yang realistis untuk katering.

## 6. Desain

- **Identitas visual = milik bisnis fiktif** (hangat/kuliner: krem + oranye/merah bata), BUKAN navy/teal Nalar — supaya prospek melihat "ini bakal jadi milik saya", bukan "ini website Nalar".
- Pengecualian: banner DEMO + tombol CTA Nalar boleh pakai navy/teal Nalar.
- Mobile-first (mayoritas prospek buka dari HP). Semua tombol pesan cukup besar untuk jempol.
- Bahasa Indonesia, ejaan benar.

## 7. Non-Goals (JANGAN dikerjakan)

- Tidak ada payment gateway.
- Tidak ada admin panel / login.
- Tidak ada testimoni / klaim palsu.
- Tidak ada harga jasa Nalar di mana pun.

## 8. Acceptance Criteria

- [ ] Banner DEMO selalu terlihat di semua halaman.
- [ ] Filter kategori + search berfungsi.
- [ ] Klik produk → detail → "Pesan via WhatsApp" membuka wa.me dengan teks terisi benar (nama + jumlah + harga).
- [ ] Keranjang: tambah/kurang/hapus/total benar; checkout kirim 1 pesan WA berisi semua item + total.
- [ ] Responsif penuh di 360px (HP) dan desktop.
- [ ] Tidak ada teks "lorem ipsum" tersisa.

## 9. Env / Config

- Tulis HANYA NAMA variabel bila butuh (contoh: `NEXT_PUBLIC_WA_NUMBER`), JANGAN tulis nilainya di kode/dokumen.
