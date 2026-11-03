export type ProductCategory =
  | "Makanan Berat"
  | "Frozen"
  | "Snack"
  | "Minuman";

export interface Product {
  id: string;
  nama: string;
  kategori: ProductCategory;
  harga: number;
  deskripsi: string;
  foto: string;
  varian?: string[];
  porsi?: string;
}

export interface CartItem {
  id: string; // Unique cart item key: `${product.id}-${selectedVariant || 'default'}`
  product: Product;
  selectedVariant?: string;
  quantity: number;
}

