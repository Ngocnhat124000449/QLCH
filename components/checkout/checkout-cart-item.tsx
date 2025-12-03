// components/checkout/checkout-cart-item.tsx

import Image from "next/image";

interface CheckoutCartItemProps {
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

export function CheckoutCartItem({
  name,
  variant,
  quantity,
  price,
  image,
}: CheckoutCartItemProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-[hsl(var(--border))] last:border-none">
      {/* Ảnh */}
      <div className="relative h-20 w-20  rounded-(--radius) overflow-hidden border border-[hsl(var(--border))]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Thông tin */}
      <div className="flex-1">
        <p className="font-medium">{name}</p>

        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Phiên bản: {variant}
        </p>

        <p className="text-sm mt-1">Số lượng: x{quantity}</p>
      </div>

      {/* Giá */}
      <div className="text-right font-medium">
        {(price * quantity).toLocaleString("vi-VN")}₫
      </div>
    </div>
  );
}
