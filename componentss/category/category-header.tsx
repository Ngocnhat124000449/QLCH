// components/category/category-header.tsx

import Image from "next/image";

interface CategoryHeaderProps {
  title: string;
  description?: string;
  banner?: string;
}

export function CategoryHeader({
  title,
  description,
  banner,
}: CategoryHeaderProps) {
  return (
    <div className="mb-8  rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
      {banner && (
        <div className="relative mb-4 h-40 w-full overflow-hidden  rounded-(--radius)">
          <Image
            src={banner}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-xl font-semibold text-[hsl(var(--foreground))]">
        {title}
      </h1>

      {description && (
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          {description}
        </p>
      )}
    </div>
  );
}
