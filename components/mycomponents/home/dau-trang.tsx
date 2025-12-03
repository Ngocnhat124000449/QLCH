"use client";

import Link from "next/link";
import {
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
import { NutChuyenGiaoDien } from "@/components/mycomponents/providers/nut-chuyen-giao-dien";

export function DauTrang() {
  return (
    <header className="bg-primary text-primary-foreground">
      {/* TOP BAR */}
      <div className="bg-foreground/10 text-xs hidden md:block">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center text-primary-foreground">
          
          {/* MARQUEE */}
          <div className="flex-grow overflow-hidden">
            <div className="marquee whitespace-nowrap">
              <div className="inline-flex items-center gap-x-4">

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Gift size={14} /> Thu cũ giá ngon - Lên đời tiết kiệm
                </Link>
                <span className="h-3 w-px bg-primary-foreground/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <PackageCheck size={14} /> Sản phẩm chính hãng - Xuất VAT
                </Link>
                <span className="h-3 w-px bg-primary-foreground/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Truck size={14} /> Giao nhanh - Miễn phí &gt;300k
                </Link>

                {/* Duplicate để tạo loop */}
                <span className="inline-block w-12"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Gift size={14} /> Thu cũ giá ngon - Lên đời tiết kiệm
                </Link>
                <span className="h-3 w-px bg-primary-foreground/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <PackageCheck size={14} /> Sản phẩm chính hãng - Xuất VAT
                </Link>
                <span className="h-3 w-px bg-primary-foreground/40"></span>

                <Link href="#" className="flex items-center gap-1 hover:underline">
                  <Truck size={14} /> Giao nhanh - Miễn phí &gt;300k
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT MENU */}
          <div className="flex-shrink-0 flex items-center gap-x-4 ml-8">
            <Link href="#" className="flex items-center gap-1 hover:underline">
              <Store size={14} /> Cửa hàng gần bạn
            </Link>

            <span className="h-3 w-px bg-primary-foreground/40"></span>

            <Link href="#" className="flex items-center gap-1 hover:underline">
              <FileText size={14} /> Tra cứu đơn hàng
            </Link>

            <span className="h-3 w-px bg-primary-foreground/40"></span>

            <Link href="#" className="flex items-center gap-1 hover:underline">
              <Phone size={14} /> 1800.2097
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        
        {/* LOGO */}
        <Link href="/" className="text-3xl font-bold flex items-end text-primary-foreground">
          cellphone<span className="text-5xl -mb-1">S</span>
        </Link>

        {/* CATEGORY BUTTON */}
        <Button variant="secondary" className="bg-foreground/10 hover:bg-foreground/20 border-none hidden md:inline-flex">
          <Menu className="mr-2" />
          Danh mục
        </Button>

        {/* LOCATION SELECT */}
        <Button variant="ghost" className="hover:bg-foreground/10 hidden lg:inline-flex">
          <MapPin className="mr-1" size={20} />
          Xem giá tại
          <ChevronDown className="ml-1" size={16} />
        </Button>

        {/* SEARCH BOX */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          
          <Input
            placeholder="Bạn muốn mua gì hôm nay?"
            className="w-full rounded-md bg-card pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* DESKTOP ACTION */}
        <div className="hidden md:flex items-center gap-1">

          <NutChuyenGiaoDien />

          <Button variant="ghost" className="hover:bg-foreground/10 p-2">
            <ShoppingCart className="md:mr-2" />
            <span className="hidden md:inline">Giỏ hàng</span>
          </Button>

          <Button variant="secondary" className="bg-foreground/10 hover:bg-foreground/20 border-none p-2">
            <UserCircle className="md:mr-2" />
            <span className="hidden md:inline">Đăng nhập</span>
          </Button>
        </div>

        {/* MOBILE ACTION */}
        <div className="flex md:hidden items-center gap-2">
          <NutChuyenGiaoDien />
          
          <Button variant="ghost" className="hover:bg-foreground/10 p-2">
            <Menu />
          </Button>
        </div>

      </div>
    </header>
  );
}
