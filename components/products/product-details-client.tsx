"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { ProductUI, ProductVariant, ProductSpecification } from "@/lib/types/product";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Minus, Plus, ShoppingCart, ShieldCheck, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

import { ProductSpecifications } from "./product-specifications";
import { ProductLongDescription } from "./product-long-description";

interface ProductDetailsClientProps {
  product: ProductUI;
  variants: ProductVariant[];
  specifications: ProductSpecification[];
}

export function ProductDetailsClient({
  product,
  variants,
  specifications,
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { toast } = useToast();

  // chọn phiên bản mặc định
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variantId: string) => {
    const found = variants.find((v) => String(v.variantId) === variantId);
    if (found) setSelectedVariant(found);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > selectedVariant.stock) return selectedVariant.stock;
      return next;
    });
  };

  const finalPrice = Number(selectedVariant.price);

  const handleAddToCart = () => {
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x "${product.name} - ${selectedVariant.variantName}" đã được thêm.`,
    });
  };

  const handleBuyNow = () => {
    const item = {
      ...product,
      name: `${product.name} - ${selectedVariant.variantName}`,
      finalPrice,
      quantity,
      variantId: selectedVariant.variantId,
    };

    sessionStorage.setItem("buyNowProduct", JSON.stringify(item));
    router.push("/checkout");
  };

  const handleWishlist = () => {
    toast({
      title: "Đã thêm vào Yêu thích",
      description: `"${product.name}" đã được thêm vào danh sách.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tên + Rating */}
      <div>
        <span className="text-sm text-primary font-medium">{product.category?.name}</span>

        <h1 className="text-3xl font-bold font-headline">{product.name}</h1>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(125 đánh giá)</span>
        </div>
      </div>

      {/* Giá */}
      <div className="text-4xl font-bold text-primary">
        {finalPrice.toLocaleString("vi-VN")}₫
        {selectedVariant.price < product.basePrice && (
          <span className="text-lg text-muted-foreground line-through ml-3">
            {Number(product.basePrice).toLocaleString("vi-VN")}₫
          </span>
        )}
      </div>

      {/* Mô tả ngắn */}
      <div>
        <p className="text-base font-semibold mb-3">Mô tả ngắn</p>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>

      {/* Chọn phiên bản */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Chọn phiên bản</Label>

        <RadioGroup
          value={String(selectedVariant.variantId)}
          onValueChange={handleVariantChange}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {variants.map((v) => (
            <Label
              key={v.variantId}
              htmlFor={String(v.variantId)}
              className={cn(
                "border rounded-lg p-3 flex flex-col items-center cursor-pointer",
                selectedVariant.variantId === v.variantId
                  ? "border-primary ring-2 ring-primary/50"
                  : "border-border",
                v.stock === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="text-sm font-medium">{v.variantName}</span>
              <span className="text-xs text-muted-foreground">
                {Number(v.price).toLocaleString("vi-VN")}₫
              </span>
              {v.stock === 0 && <span className="text-xs text-red-500">Hết hàng</span>}
              <RadioGroupItem
                value={String(v.variantId)}
                id={String(v.variantId)}
                className="sr-only"
                disabled={v.stock === 0}
              />
            </Label>
          ))}
        </RadioGroup>
      </div>

      {/* Số lượng */}
      <div className="flex items-center gap-4">
        <Label className="text-base font-semibold">Số lượng:</Label>

        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <Input
            type="number"
            className="h-9 w-14 text-center"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= selectedVariant.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <span className="text-sm text-muted-foreground">
          {selectedVariant.stock} sản phẩm có sẵn
        </span>
      </div>

      {/* Nút mua */}
      <div className="grid grid-cols-2 gap-3">
        <Button size="lg" onClick={handleBuyNow}>
          Mua ngay
        </Button>

        <Button size="lg" variant="outline" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Thêm vào giỏ
        </Button>
      </div>

      <Button variant="ghost" className="w-fit mx-auto" onClick={handleWishlist}>
        <Heart className="mr-2 h-4 w-4" /> Thêm vào yêu thích
      </Button>

      {/* Bảo hành */}
      <Card>
        <CardContent className="p-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p>Bảo hành chính hãng 12 tháng</p>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p>Đổi mới 12 tháng tại toàn hệ thống</p>
          </div>
        </CardContent>
      </Card>

      {/* Thông số kỹ thuật */}
      <ProductSpecifications specifications={specifications} />

      {/* Mô tả dài */}
      <ProductLongDescription />
    </div>
  );
}
