// components/checkout/checkout-right-panel.tsx

import { CheckoutSummary } from "./checkout-summary";
import { VoucherInput } from "./voucher-input";
import { PlaceOrderButton } from "./place-order-button";

interface CheckoutRightPanelProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  onApplyVoucher: (code: string) => void;
  onPlaceOrder: () => void;
  onOpenVoucherList?: () => void;
}

export function CheckoutRightPanel({
  subtotal,
  shippingFee,
  discount,
  onApplyVoucher,
  onPlaceOrder,
  onOpenVoucherList,
}: CheckoutRightPanelProps) {
  return (
    <div className="space-y-4 sticky top-6">
      <VoucherInput
        onApply={onApplyVoucher}
        onOpenList={onOpenVoucherList}
      />

      <CheckoutSummary
        subtotal={subtotal}
        shippingFee={shippingFee}
        discount={discount}
      />

      <PlaceOrderButton onPlaceOrder={onPlaceOrder} />
    </div>
  );
}
