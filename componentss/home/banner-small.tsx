// components/home/banner-small.tsx

import Image from "next/image";

interface BannerSmallProps {
  items: { image: string; href?: string }[];
}

export function BannerSmall({ items }: BannerSmallProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative aspect-16/6 overflow-hidden  rounded-(--radius)"
        >
          <Image
            src={item.image}
            alt="banner-small"
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
