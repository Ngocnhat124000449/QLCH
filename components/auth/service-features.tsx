"use client";

import { ShieldCheck, Headphones, Truck, RefreshCcw, BadgeCheck, Percent } from "lucide-react";

export default function ServiceFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Bảo hành chính hãng",
      desc: "Bảo hành 24 tháng cho tất cả sản phẩm",
    },
    {
      icon: Headphones,
      title: "Hỗ trợ 24/7",
      desc: "Luôn sẵn sàng giải đáp mọi thắc mắc",
    },
    {
      icon: Truck,
      title: "Giao hàng nhanh chóng",
      desc: "Nhận hàng chỉ trong 2-3 ngày làm việc",
    },
    {
      icon: RefreshCcw,
      title: "Đổi trả dễ dàng",
      desc: "Đổi trả trong vòng 7 ngày nếu không hài lòng",
    },
    {
      icon: BadgeCheck,
      title: "Sản phẩm chính hãng",
      desc: "Cam kết 100% sản phẩm chính hãng, chất lượng",
    },
    {
      icon: Percent,
      title: "Ưu đãi đặc biệt",
      desc: "Nhận nhiều khuyến mãi hấp dẫn mỗi tuần",
    },
  ];

  return (
    <div className="bg-[#0f1629] rounded-xl p-4 border border-[#1b2339] shadow-md min-h-full">
      <ul className="space-y-4">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={index} className="flex items-start gap-3">
              <div className="p-2 bg-[#1b2339] rounded-lg text-blue-400">
                <Icon size={20} />
              </div>

              <div className="flex flex-col">
                <span className="text-gray-200 font-medium text-sm">
                  {item.title}
                </span>
                <span className="text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
