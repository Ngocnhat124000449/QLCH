"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export interface VariantItem {
  name: string;
  price: number;
  stock: number;
}

interface ProductVariantsEditorProps {
  variants: VariantItem[];
  setVariants: (value: VariantItem[]) => void;
}

export function ProductVariantsEditor({ variants, setVariants }: ProductVariantsEditorProps) {
  const addVariant = () => {
    setVariants([...variants, { name: "", price: 0, stock: 0 }]);
  };

  const updateVariant = (index: number, field: keyof VariantItem, value: string | number) => {
    const updated = [...variants];
    updated[index][field] = field === "name" ? (value as string) : Number(value);
    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-4 space-y-4 border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <h3 className="font-semibold text-lg">Biến thể sản phẩm</h3>

      <div className="space-y-3">
        {variants.map((v, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 items-center">
            <Input
              placeholder="Tên biến thể (VD: Đỏ / 256GB)"
              value={v.name}
              onChange={(e) => updateVariant(i, "name", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Giá"
              value={v.price}
              onChange={(e) => updateVariant(i, "price", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Tồn kho"
              value={v.stock}
              onChange={(e) => updateVariant(i, "stock", e.target.value)}
            />
            <Button variant="destructive" size="icon" onClick={() => removeVariant(i)}>
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addVariant}>+ Thêm biến thể</Button>
    </Card>
  );
}
