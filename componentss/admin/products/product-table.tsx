"use client";

import { useEffect, useState } from "react";
import { ProductTableRow } from "./product-table-row";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface ProductItem {
  ProductID: number;
  Name: string;
  Price: number;
  ThumbnailURL: string;
  CategoryID: number;
  Stock: number;
}

export function ProductTable() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const res = await fetch(`/api/products?q=${search}`);
    const data = await res.json();
    setProducts(data.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    fetchProducts();
  };

  return (
    <Card className="p-6 border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý sản phẩm</h2>

        <div className="flex gap-2">
          <Input
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />
          <Button onClick={handleSearch}>Tìm</Button>

          <Button asChild>
            <a href="/admin/products/create">+ Thêm sản phẩm</a>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-[hsl(var(--border))]">
        <table className="w-full text-sm">
          <thead className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
            <tr>
              <th className="p-3 text-left">Ảnh</th>
              <th className="p-3 text-left">Tên sản phẩm</th>
              <th className="p-3 text-left">Giá</th>
              <th className="p-3 text-left">Tồn kho</th>
              <th className="p-3 text-left">Danh mục</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}

            {products.map((item) => (
              <ProductTableRow key={item.ProductID} item={item} onDelete={fetchProducts} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
