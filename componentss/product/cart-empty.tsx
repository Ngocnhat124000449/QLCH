// components/cart/cart-empty.tsx
// Component: Hiển thị khi giỏ hàng trống

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="rounded-full bg-[hsl(var(--secondary))] p-4">
        <ShoppingCart className="h-10 w-10 text-[hsl(var(--muted-foreground))]" />
      </div>

      <h2 className="text-lg font-semibold">Giỏ hàng của bạn đang trống</h2>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        Hãy thêm sản phẩm vào giỏ để tiếp tục mua sắm nhé!
      </p>

      <Link href="/products">
        <Button variant="primary">Tiếp tục mua sắm</Button>
      </Link>
    </div>
  );
}
