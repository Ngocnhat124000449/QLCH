// components/account/address-item.tsx

import { Button } from "@/components/ui/button";

interface AddressItemProps {
  id: number;
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AddressItem({
  id,
  name,
  phone,
  address,
  isDefault,
  onEdit,
  onDelete,
}: AddressItemProps) {
  return (
    <div className=" rounded-(--radius) border p-4 bg-[hsl(var(--card))] space-y-2">
      {isDefault && (
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
          Mặc định
        </span>
      )}

      <p className="font-semibold">{name}</p>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{phone}</p>
      <p className="text-sm">{address}</p>

      <div className="flex gap-2 mt-2">
        <Button size="sm" variant="secondary" onClick={onEdit}>
          Sửa
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete}>
          Xóa
        </Button>
      </div>
    </div>
  );
}
