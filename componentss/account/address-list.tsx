// components/account/address-list.tsx

import { AddressItem } from "./address-item";

interface AddressListProps {
  addresses: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function AddressList({
  addresses,
  onEdit,
  onDelete,
}: AddressListProps) {
  return (
    <div className="grid gap-4">
      {addresses.map((addr) => (
        <AddressItem
          key={addr.id}
          {...addr}
          onEdit={() => onEdit(addr.id)}
          onDelete={() => onDelete(addr.id)}
        />
      ))}
    </div>
  );
}
