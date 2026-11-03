import type { Metadata } from "next";
import { League_Spartan, Figtree } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { DemoBanner } from "@/components/demo-banner";
import { SiteHeader } from "@/components/site-header";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-spartan",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dapur Rempah Nusantara — Demo Katalog Digital Nalar Solusi Digital",
  description:
    "Demo site Katalog Digital + Order via WhatsApp untuk katering dan makanan beku oleh Nalar Solusi Digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${leagueSpartan.variable} ${figtree.variable}`}>
      <body className="antialiased min-h-[100dvh] flex flex-col justify-between">
        <CartProvider>
          <div>
            <DemoBanner />
            <SiteHeader />
            <main>{children}</main>
          </div>
          <CartDrawer />
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
