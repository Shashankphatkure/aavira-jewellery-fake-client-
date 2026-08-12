export type Category =
  | "rings"
  | "earrings"
  | "necklaces"
  | "bracelets"
  | "sets";

export type Tag = "new-arrival" | "best-seller";

export type VariantOption = {
  label: string;
  value: string;
  swatch?: string;
};

export type Variant = {
  name: string;
  options: VariantOption[];
};

export type Review = {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  tags: Tag[];
  price: number;
  compareAtPrice?: number;
  images: string[];
  description: string;
  highlights: string[];
  material: string;
  variants: Variant[];
  stock: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
};
