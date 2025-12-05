"use client";

import { Truck, RefreshCw, Headphones } from "lucide-react";
import type { ElementType } from "react";

type Feature = {
  icon: ElementType;     // FIXED
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Miễn phí giao hàng toàn quốc",
  },
  {
    icon: RefreshCw,
    title: "Đổi trả 7 ngày",
    description: "Đổi trả dễ dàng, không cần lý do",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Tư vấn trực tuyến mọi lúc",
  },
];

export function ServiceFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-4">
          <f.icon className="w-8 h-8 text-primary" />
          <div>
            <p className="text-lg font-semibold">{f.title}</p>
            <p className="text-muted-foreground text-sm">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
