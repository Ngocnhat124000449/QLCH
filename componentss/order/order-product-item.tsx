// components/order/order-product-item.tsx

import Image from "next/image";

interface OrderProductItemProps {
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

export function OrderProductItem({
  name,
  variant,
  quantity,
  price,
  image,
}: OrderProductItemProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-[hsl(var(--border))] last:border-0">
      <div className="relative h-20 w-20  rounded-(--radius) overflow-hidden border border-[hsl(var(--border))]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Phiên bản: {variant}
        </p>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm">x{quantity}</span>
          <span className="font-medium">
            {(price * quantity).toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>
    </div>
  );
}
