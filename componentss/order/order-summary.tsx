// components/order/order-summary.tsx

interface OrderSummaryProps {
  total: number;
  shippingFee?: number;
}

export function OrderSummary({
  total,
  shippingFee = 0,
}: OrderSummaryProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span>Tổng tiền hàng:</span>
        <span>{total.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Phí vận chuyển:</span>
        <span>{shippingFee.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="border-t border-[hsl(var(--border))] pt-3 flex justify-between font-semibold">
        <span>Thành tiền:</span>
        <span>{(total + shippingFee).toLocaleString("vi-VN")}₫</span>
      </div>
    </div>
  );
}
