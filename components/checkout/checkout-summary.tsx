// components/checkout/checkout-summary.tsx

interface CheckoutSummaryProps {
  subtotal: number;      // tổng tiền hàng
  shippingFee: number;   // phí ship
  discount?: number;     // giảm giá từ voucher
}

export function CheckoutSummary({
  subtotal,
  shippingFee,
  discount = 0,
}: CheckoutSummaryProps) {
  const total = subtotal + shippingFee - discount;

  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-3">

      <h2 className="text-lg font-semibold">Tổng thanh toán</h2>

      <div className="flex justify-between text-sm">
        <span>Tạm tính:</span>
        <span>{subtotal.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Phí vận chuyển:</span>
        <span>{shippingFee.toLocaleString("vi-VN")}₫</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-sm">
          <span>Giảm giá:</span>
          <span className="text-green-600">- {discount.toLocaleString("vi-VN")}₫</span>
        </div>
      )}

      <div className="border-t border-[hsl(var(--border))] pt-3 flex justify-between font-semibold text-base">
        <span>Thành tiền:</span>
        <span>{total.toLocaleString("vi-VN")}₫</span>
      </div>

    </div>
  );
}
