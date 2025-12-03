// components/checkout/payment-warning.tsx

interface PaymentWarningProps {
  method: string;
}

export function PaymentWarning({ method }: PaymentWarningProps) {
  const messages: Record<string, string> = {
    cod: "Lưu ý: Vui lòng kiểm tra sản phẩm trước khi thanh toán. Phí thu hộ có thể áp dụng.",
    bank: "Bạn sẽ nhận được thông tin chuyển khoản sau khi đặt hàng.",
    momo: "Bạn sẽ được chuyển sang ứng dụng MoMo sau khi xác nhận đơn hàng.",
    vnpay: "Thanh toán an toàn qua VNPAY. Hỗ trợ QR code & thẻ ngân hàng.",
    zalopay: "Bạn sẽ được chuyển đến ứng dụng ZaloPay để xác nhận.",
  };

  if (!method) return null;

  return (
    <div className=" rounded-(--radius) bg-yellow-100 text-yellow-800 px-3 py-2 text-sm">
      ⚠ {messages[method] || "Vui lòng 확인 phương thức thanh toán."}
    </div>
  );
}
