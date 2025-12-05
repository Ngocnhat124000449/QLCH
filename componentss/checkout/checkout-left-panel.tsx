// components/checkout/checkout-left-panel.tsx

import { CheckoutAddressSelector } from "./checkout-address-selector";
import { ShippingMethodSelector } from "./shipping-method-selector";
import { PaymentMethodSelector } from "./payment-method-selector";
import { CheckoutCartList } from "./checkout-cart-list";

interface CheckoutLeftPanelProps {
  addresses: any[];
  selectedAddressId?: number;
  onSelectAddress: (id: number) => void;

  shippingMethods: any[];
  selectedShippingId?: string;
  onSelectShipping: (id: string) => void;

  paymentMethod?: string;
  onSelectPayment: (id: string) => void;

  items: any[];
  onAddNewAddress: () => void;
}

export function CheckoutLeftPanel({
  addresses,
  selectedAddressId,
  onSelectAddress,
  shippingMethods,
  selectedShippingId,
  onSelectShipping,
  paymentMethod,
  onSelectPayment,
  items,
  onAddNewAddress,
}: CheckoutLeftPanelProps) {
  return (
    <div className="space-y-6">
      <CheckoutAddressSelector
        addresses={addresses}
        selectedId={selectedAddressId}
        onSelect={onSelectAddress}
        onAddNew={onAddNewAddress}
      />

      <ShippingMethodSelector
        methods={shippingMethods}
        selectedId={selectedShippingId}
        onSelect={onSelectShipping}
      />

      <PaymentMethodSelector
        selectedId={paymentMethod}
        onSelect={onSelectPayment}
      />

      <CheckoutCartList items={items} />
    </div>
  );
}
