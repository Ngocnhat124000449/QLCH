"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { ProductUI } from "@/lib/types/product-service";
import { getRecentProducts } from "@/lib/services/products";

export function RecentProducts() {
  const [products, setProducts] = useState<ProductUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRecentProducts(5);
        setProducts(data);
      } catch (error) {
        console.error("Lỗi tải sản phẩm gần đây:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Sản phẩm gần đây</CardTitle>
          <CardDescription>5 sản phẩm mới được thêm vào gần đây.</CardDescription>
        </div>

        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/admin/products">
            Xem tất cả
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Hình ảnh</span>
                </TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Giá</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      src={product.thumbnailUrl ?? "https://placehold.co/64"}
                      width={64}
                      height={64}
                      className="aspect-square rounded-md object-cover"
                    />
                  </TableCell>

                  <TableCell className="font-medium">{product.name}</TableCell>

                  <TableCell>
                    <Badge variant="default">ACTIVE</Badge>
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {Number(product.basePrice).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
