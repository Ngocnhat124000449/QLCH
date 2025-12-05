// components/home/category-highlight.tsx

import Link from "next/link";
import Image from "next/image";

interface CategoryHighlightProps {
  categories: {
    id: number;
    name: string;
    image: string;
  }[];
}

export function CategoryHighlight({ categories }: CategoryHighlightProps) {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
      {categories.map((cat) => (
        <Link
          href={`/categories/${cat.id}`}
          key={cat.id}
          className="flex flex-col items-center gap-2  rounded-(--radius) border border-[hsl(var(--border))] p-2 hover:bg-[hsl(var(--secondary))]"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-xs font-medium text-center line-clamp-1">
            {cat.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
