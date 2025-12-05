"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Category = {
  CategoryID: number;
  Name: string;
  Icon?: LucideIcon; // Nếu bạn cần icon
};

export default function CategoryVerticalMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-400">
        Đang tải danh mục...
      </div>
    );
  }

  return (
    <div className="bg-[#0f1629] rounded-xl p-4 w-full border border-[#1b2339] shadow-md">
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.CategoryID}>
            <Link
              href={`/danh-muc/${cat.CategoryID}`}
              className="flex items-center justify-between px-3 py-2 rounded-md
                         hover:bg-[#172036] transition-colors duration-150
                         text-gray-200 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {/* Icon placeholder nếu bạn muốn thêm icon vào DB */}
                <span className="text-blue-400">
                  {/* Icon mặc định nếu chưa có icon */}
                  •
                </span>
                <span className="font-medium">{cat.Name}</span>
              </div>

              {/* Mũi tên bên phải */}
              <span className="text-gray-500">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
