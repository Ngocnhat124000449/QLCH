"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Dùng đúng ProductUI chuẩn của hệ thống
import type { ProductUI } from "@/lib/types/product-service";

// Dùng service API mới
import { fetchProductsByCategory } from "@/lib/services/products";

const dienThoaiSubCategories = [
  { name: "Cho trẻ em", icon: "https://cdn-icons-png.flaticon.com/128/1048/1048949.png" },
  { name: "Chơi game", icon: "https://cdn-icons-png.flaticon.com/128/686/686589.png" },
  { name: "Đồ hoạ - Sáng tạo", icon: "https://cdn-icons-png.flaticon.com/128/2920/2920282.png" },
];

const tabletSubCategories = [
  { name: "Học tập - văn phòng", icon: "https://cdn-icons-png.flaticon.com/128/2232/2232688.png" },
  { name: "Máy tính bảng AI", icon: "https://cdn-icons-png.flaticon.com/128/1055/1055685.png" },
  { name: "Máy đọc sách", icon: "https://cdn-icons-png.flaticon.com/128/2990/2990666.png" },
];

const dienThoaiFilters = ["iPhone 16", "Galaxy Z Fold7", "S25 Ultra", "iPhone 15", "Xiaomi 14"];
const tabletFilters = ["iPad Pro M5", "iPad Pro M4 2024", "Galaxy Tab S11 Series", "iPad", "Xiaomi", "Samsung", "Huawei"];

function TabContent({
  products,
  subCategories,
  filters,
}: {
  products: ProductUI[];
  subCategories: any[];
  filters: string[];
}) {
  return (
    <div>
      {/* SUB CATEGORIES */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {subCategories.map((cat) => (
          <Button key={cat.name} variant="outline" className="bg-card hover:bg-accent hover:border-primary">
            <Image src={cat.icon} alt={cat.name} width={24} height={24} className="mr-2" />
            {cat.name}
          </Button>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {filters.map((filter) => (
          <Button key={filter} variant="outline" size="sm" className="rounded-full">
            {filter}
          </Button>
        ))}
        <Link href="#" className="flex items-center text-primary text-sm font-semibold hover:underline ml-2">
          Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            variant="detailed"   // ✔ Không dùng "default" nữa
          />
        ))}
      </div>
    </div>
  );
}

export function DienThoaiTabletSection() {
  const [dienThoaiProducts, setDienThoaiProducts] = useState<ProductUI[]>([]);
  const [tabletProducts, setTabletProducts] = useState<ProductUI[]>([]);

  useEffect(() => {
    async function load() {
      const smartphoneData = await fetchProductsByCategory("smartphones", 8);
      const tabletData = await fetchProductsByCategory("tablets", 8);

      setDienThoaiProducts(smartphoneData);
      setTabletProducts(tabletData);
    }

    load();
  }, []);

  return (
    <div className="mb-12">
      <Tabs defaultValue="dien-thoai">
        <div className="flex justify-center mb-6">
          <TabsList className="h-auto p-1.5">
            <TabsTrigger value="dien-thoai" className="text-xl font-bold px-6 py-2">
              ĐIỆN THOẠI
            </TabsTrigger>
            <TabsTrigger value="may-tinh-bang" className="text-xl font-bold px-6 py-2">
              MÁY TÍNH BẢNG
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dien-thoai">
          <TabContent
            products={dienThoaiProducts}
            subCategories={dienThoaiSubCategories}
            filters={dienThoaiFilters}
          />
        </TabsContent>

        <TabsContent value="may-tinh-bang">
          <TabContent
            products={tabletProducts}
            subCategories={tabletSubCategories}
            filters={tabletFilters}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
