// components/product/related-products.tsx

import { ProductCard } from "./product-card";

interface RelatedProductsProps {
  products: Array<{
    id: number;
    name: string;
    price: number;
    thumbnail: string;
  }>;
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-lg font-semibold">Sản phẩm tương tự</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
