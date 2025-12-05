// File: components/products/product-specifications.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductSpecification } from "@/lib/types/product";

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông số kỹ thuật</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2 text-sm">
          {specifications.map((spec) => (
            <li
              key={spec.specId}
              className="flex justify-between p-2 rounded-md even:bg-muted/50"
            >
              <span className="text-muted-foreground">{spec.key}</span>
              <span className="font-medium text-right">{spec.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
