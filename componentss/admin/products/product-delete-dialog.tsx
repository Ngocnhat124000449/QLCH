"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProductDeleteDialog({
  productID,
  afterDelete,
}: {
  productID: number;
  afterDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  const deleteProduct = async () => {
    await fetch(`/api/products/${productID}`, {
      method: "DELETE",
    });

    setOpen(false);
    afterDelete();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Xoá</Button>
      </DialogTrigger>

      <DialogContent className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn muốn xoá?</DialogTitle>
          <DialogDescription>
            Sản phẩm sẽ bị xoá vĩnh viễn khỏi hệ thống.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Huỷ
          </Button>
          <Button variant="destructive" onClick={deleteProduct}>
            Xoá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
