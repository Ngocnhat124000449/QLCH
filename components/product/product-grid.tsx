// components/product/product-grid.tsx

import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Array<{
    ProductID: number;
    Name: string;
    BasePrice: number;
    ThumbnailURL: string | null;
    Images?: any[];
    Variants?: any[];
  }>;
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.ProductID}
          id={p.ProductID}
          name={p.Name}
          price={Number(p.BasePrice)}
          thumbnail={p.ThumbnailURL || "/placeholder.png"}
          variantCount={p.Variants?.length}
        />
      ))}
    </div>
  );
}
