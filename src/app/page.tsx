import React from "react";
import productsData from "@data/products.json";
import { Product } from "@/lib/types";
import { HeroSection } from "@/components/hero-section";
import { CatalogSection } from "@/components/catalog-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { ActionTileSection } from "@/components/action-tile-section";

export default function HomePage() {
  const products = productsData as Product[];

  return (
    <div>
      <HeroSection />
      <CatalogSection products={products} />
      <HowItWorksSection />
      <ActionTileSection />
    </div>
  );
}
