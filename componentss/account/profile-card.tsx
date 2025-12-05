// components/account/profile-card.tsx

import Image from "next/image";

interface ProfileCardProps {
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export function ProfileCard({
  fullName,
  email,
  phone,
  avatar,
}: ProfileCardProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 flex items-center gap-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[hsl(var(--border))]">
        <Image
          src={avatar || "/avatar-default.png"}
          alt={fullName}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h2 className="text-lg font-medium">{fullName}</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{email}</p>

        {phone && (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            SĐT: {phone}
          </p>
        )}
      </div>
    </div>
  );
}
