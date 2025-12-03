"use client";

import Link from "next/link";
import {
  Smartphone,
  ChevronDown,
  MapPin,
  Search,
  ShoppingCart,
  UserCircle,
  Menu,
  Gift,
  PackageCheck,
  Truck,
  Store,
  FileText,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/mycomponents/providers/theme-toggle";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      {/* Thanh top chạy chữ */}
      <div className="bg-black bg-opacity-20 text-xs hidden md:block">
        <div className="container mx-auto px-4 py-1.5 text-white flex justify-between items-center">
          
          {/* Marquee */}
          <div className="flex-grow overflow-hidden">
            <div className="marquee whitespace-nowrap">
              <div className="inline-flex items-center gap-x-4">

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Gift size={14} /> Thu cũ giá ngon - Lên đời tiết kiệm
                </Link>

                <span className="h-3 w-px bg-white/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <PackageCheck size={14} /> Sản phẩm chính hãng - Xuất VAT đầy đủ
                </Link>

                <span className="h-3 w-px bg-white/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Truck size={14} /> Giao nhanh - Miễn phí cho đơn {">"} 300k
                </Link>

                {/* Duplicate for infinite loop */}
                <span className="inline-block w-12"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Gift size={14} /> Thu cũ giá ngon - Lên đời tiết kiệm
                </Link>

                <span className="h-3 w-px bg-white/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <PackageCheck size={14} /> Sản phẩm chính hãng - Xuất VAT đầy đủ
                </Link>

                <span className="h-3 w-px bg-white/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Truck size={14} /> Giao nhanh - Miễn phí cho đơn {">"} 300k
                </Link>
              </div>
            </div>
          </div>

          {/* Liên kết bên phải */}
          <div className="flex-shrink-0 flex items-center gap-x-4 ml-8">
            <Link href="#" className="flex items-center gap-1 hover:underline">
              <Store size={14} /> Cửa hàng gần bạn
            </Link>

            <span className="h-3 w-px bg-white/40"></span>

            <Link href="#" className="flex items-center gap-1 hover:underline">
              <FileText size={14} /> Tra cứu đơn hàng
            </Link>

            <span className="h-3 w-px bg-white/40"></span>

            <Link href="#" className="flex items-center gap-1 hover:underline">
              <Phone size={14} /> 1800.2097
            </Link>
          </div>
        </div>
      </div>

      {/* Phần chính header */}
      <div className="container mx-auto flex items-center gap-2 md:gap-4 px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white flex items-end">
          cellphone<span className="text-5xl -mb-1">S</span>
        </Link>

        {/* Nút danh mục */}
        <Button
          variant="secondary"
          className="bg-white/20 hover:bg-white/30 border-none hidden md:inline-flex"
        >
          <Menu className="mr-2" />
          Danh mục
        </Button>

        {/* Xem giá tại */}
        <Button variant="ghost" className="hover:bg-white/20 hidden lg:inline-flex">
          <MapPin className="mr-1" size={20} />
          Xem giá tại
          <ChevronDown className="ml-1" size={16} />
        </Button>

        {/* Thanh tìm kiếm */}
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Bạn muốn mua gì hôm nay?"
            className="w-full rounded-md bg-white pl-10 text-black placeholder:text-gray-500"
          />
        </div>

        {/* Nút ở desktop */}
        <div className="hidden md:flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" className="hover:bg-white/20 p-2 md:p-2">
            <ShoppingCart className="md:mr-2" />
            <span className="hidden md:inline">Giỏ hàng</span>
          </Button>
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-none p-2 md:p-2">
            <UserCircle className="md:mr-2" />
            <span className="hidden md:inline">Đăng nhập</span>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button variant="ghost" className="hover:bg-white/20 p-2">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
}
