// components/checkout/voucher-list.tsx

import { VoucherItem } from "./voucher-item";

interface VoucherListProps {
  vouchers: {
    id: number;
    code: string;
    name: string;
    discount: string;
    expiry: string;
  }[];
  onApply: (code: string) => void;
}

export function VoucherList({ vouchers, onApply }: VoucherListProps) {
  return (
    <div className="space-y-3">
      {vouchers.map((v) => (
        <VoucherItem
          key={v.id}
          {...v}
          onApply={() => onApply(v.code)}
        />
      ))}
    </div>
  );
}
