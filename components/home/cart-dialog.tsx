'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { ProductUI } from "@/lib/types/product";

type CartItem = ProductUI & { quantity: number };

type CartDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  wishlistItems: ProductUI[];
  setWishlistItems: React.Dispatch<React.SetStateAction<ProductUI[]>>;
  onAddToCart: (product: ProductUI, quantity?: number) => void;
};

export function CartDialog({
  open,
  onOpenChange,
  cartItems,
  setCartItems,
  wishlistItems,
  setWishlistItems,
  onAddToCart
}: CartDialogProps) {

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleMoveToCart = (product: ProductUI) => {
    onAddToCart(product, 1);
    handleRemoveFromWishlist(product.id);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.basePrice * item.quantity, 0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Giỏ hàng & Yêu thích</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="cart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cart">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Giỏ hàng ({cartItems.length})
            </TabsTrigger>

            <TabsTrigger value="wishlist">
              <Heart className="mr-2 h-5 w-5" />
              Yêu thích ({wishlistItems.length})
            </TabsTrigger>
          </TabsList>

          {/* CART */}
          <TabsContent value="cart">
            {cartItems.length > 0 ? (
              <>
                <div className="pr-6">
                  <ScrollArea className="h-full max-h-[50vh]">
                    <div className="divide-y">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-start gap-4 py-4">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.thumbnailUrl ?? "https://placehold.co/96"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <Link
                              href={`/products/${item.slug}`}
                              className="font-semibold text-base hover:underline"
                              onClick={() => onOpenChange(false)}
                            >
                              {item.name}
                            </Link>

                            <p className="text-primary font-bold text-lg mt-1">
                              {item.basePrice.toLocaleString('vi-VN')}₫
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>

                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                                  }
                                  className="h-8 w-12 border-x border-y-0 text-center"
                                />

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemoveFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <DialogFooter className="pt-6 border-t flex-col space-y-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <DialogClose asChild>
                      <Button variant="outline" size="lg">
                        Tiếp tục mua sắm
                      </Button>
                    </DialogClose>

                    <Button asChild size="lg">
                      <Link href="/checkout">Tiến hành thanh toán</Link>
                    </Button>
                  </div>
                </DialogFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 h-[400px]">
                <div className="h-28 w-28 flex items-center justify-center bg-secondary rounded-full mb-6">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Giỏ hàng trống</h3>
                <p className="text-muted-foreground mt-2 mb-8">
                  Thêm sản phẩm để bắt đầu mua sắm!
                </p>
                <DialogClose asChild>
                  <Button size="lg">Tiếp tục mua sắm</Button>
                </DialogClose>
              </div>
            )}
          </TabsContent>

          {/* WISHLIST */}
          <TabsContent value="wishlist">
            {wishlistItems.length > 0 ? (
              <>
                <div className="pr-6">
                  <ScrollArea className="h-full max-h-[50vh]">
                    <div className="divide-y">
                      {wishlistItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 py-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                            <Image
                              src={item.thumbnailUrl ?? "https://placehold.co/80"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <Link
                              href={`/products/${item.slug}`}
                              className="font-semibold text-sm hover:underline"
                              onClick={() => onOpenChange(false)}
                            >
                              {item.name}
                            </Link>

                            <p className="text-primary font-bold text-base mt-1">
                              {item.basePrice.toLocaleString('vi-VN')}₫
                            </p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button size="sm" onClick={() => handleMoveToCart(item)}>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Thêm vào giỏ
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <DialogFooter className="pt-6 border-t">
                  <DialogClose asChild>
                    <Button variant="outline" size="lg" className="w-full">
                      Tiếp tục mua sắm
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 h-[400px]">
                <div className="h-28 w-28 flex items-center justify-center bg-secondary rounded-full mb-6">
                  <Heart className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Danh sách yêu thích trống</h3>
                <p className="text-muted-foreground mt-2 mb-8">
                  Lưu lại những sản phẩm bạn quan tâm để xem lại sau!
                </p>
                <DialogClose asChild>
                  <Button size="lg">Bắt đầu khám phá</Button>
                </DialogClose>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
