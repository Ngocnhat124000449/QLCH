"use client";

import { ProductItem } from "./product-table";
import { Button } from "@/components/ui/button";
import { ProductDeleteDialog } from "./product-delete-dialog";

export function ProductTableRow({
  item,
  onDelete,
}: {
  item: ProductItem;
  onDelete: () => void;
}) {
  return (
    <tr className="border-b border-[hsl(var(--border))]">
      <td className="p-3">
        <img
          src={item.ThumbnailURL}
          className="w-12 h-12 rounded-md object-cover border border-[hsl(var(--border))]"
        />
      </td>

      <td className="p-3 font-medium">{item.Name}</td>

      <td className="p-3">{item.Price.toLocaleString()} đ</td>

      <td className="p-3">{item.Stock}</td>

      <td className="p-3">{item.CategoryID}</td>

      <td className="p-3 text-right flex gap-2 justify-end">
        <Button variant="secondary" asChild>
          <a href={`/admin/products/${item.ProductID}/edit`}>Sửa</a>
        </Button>

        <ProductDeleteDialog productID={item.ProductID} afterDelete={onDelete} />
      </td>
    </tr>
  );
}
