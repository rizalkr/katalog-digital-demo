import { CartItem, Product } from "./types";

export const DEMO_WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
export const NALAR_WA_NUMBER =
  process.env.NEXT_PUBLIC_NALAR_WA_NUMBER || "6281529964902";

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildSingleProductWaMessage(
  product: Product,
  quantity: number,
  selectedVariant?: string
): string {
  const variantText = selectedVariant ? ` (Varian: ${selectedVariant})` : "";
  const total = formatRupiah(product.harga * quantity);

  return (
    `Halo Dapur Rempah Nusantara,\n\n` +
    `Saya mau pesan menu berikut:\n` +
    `• ${product.nama}${variantText} x${quantity} — ${total}\n\n` +
    `Mohon info ketersediaan dan estimasi pengirimannya. Terima kasih.\n\n` +
    `[Simulasi Pemesanan Demo Nalar Solusi Digital]`
  );
}

export function buildSingleProductWaUrl(
  product: Product,
  quantity: number,
  selectedVariant?: string
): string {
  const message = buildSingleProductWaMessage(
    product,
    quantity,
    selectedVariant
  );
  return `https://wa.me/${DEMO_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildCartCheckoutWaMessage(items: CartItem[]): string {
  if (items.length === 0) return "";

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.harga * item.quantity,
    0
  );

  const itemListText = items
    .map((item, index) => {
      const variantText = item.selectedVariant
        ? ` (${item.selectedVariant})`
        : "";
      const lineTotal = formatRupiah(item.product.harga * item.quantity);
      return `${index + 1}. ${item.product.nama}${variantText} x${item.quantity} = ${lineTotal}`;
    })
    .join("\n");

  return (
    `Halo Dapur Rempah Nusantara,\n\n` +
    `Saya mau checkout pesanan dari Katalog Digital:\n\n` +
    `${itemListText}\n\n` +
    `Total Pesanan: ${formatRupiah(totalAmount)}\n\n` +
    `Mohon konfirmasi pesanan dan instruksi pengirimannya. Terima kasih.\n\n` +
    `[Simulasi Pemesanan Demo Nalar Solusi Digital]`
  );
}

export function buildCartCheckoutWaUrl(items: CartItem[]): string {
  const message = buildCartCheckoutWaMessage(items);
  return `https://wa.me/${DEMO_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildNalarSalesWaUrl(): string {
  const text =
    "Halo Nalar Solusi Digital, saya telah mencoba demo Dapur Rempah Nusantara dan tertarik untuk membuat Katalog Digital + Order WhatsApp serupa untuk bisnis saya.";
  return `https://wa.me/${NALAR_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

