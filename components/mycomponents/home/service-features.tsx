"use client";

import { Truck, ShieldCheck, LifeBuoy } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Giao hàng miễn phí",
    description: "Cho mọi đơn hàng trên 2 triệu",
  },
  {
    icon: ShieldCheck,
    title: "Bảo hành chính hãng",
    description: "Yên tâm sử dụng với bảo hành 12 tháng",
  },
  {
    icon: LifeBuoy,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ hỗ trợ chuyên nghiệp",
  },
];

export function ServiceFeatures() {
  return (
    <section className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex flex-col items-center">
                <Icon className="h-8 w-8 text-primary" />

                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-1 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
