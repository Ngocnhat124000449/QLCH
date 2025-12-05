"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type User, getUserById } from "@/lib/services/users";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type ViewUserDialogProps = {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Item hiển thị label + value
const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col space-y-1">
    <p className="text-sm text-muted-foreground">{label}</p>
    <div className="font-medium">{value}</div>
  </div>
);

export function ViewUserDialog({ user, open, onOpenChange }: ViewUserDialogProps) {
  const [latestUser, setLatestUser] = useState<User>(user);

  // OPTIONAL: Tải thông tin mới nhất từ server khi mở dialog
  useEffect(() => {
    if (!open) return;

    async function fetchUser() {
      try {
        const freshUser = await getUserById(user.id);
        setLatestUser(freshUser);
      } catch {
        setLatestUser(user); // fallback
      }
    }

    fetchUser();
  }, [open, user]);

  if (!latestUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chi tiết khách hàng</DialogTitle>
          <DialogDescription>
            Thông tin đầy đủ về khách hàng {latestUser.fullName}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">

          {/* Avatar + Basic Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={latestUser.avatarUrl ?? ""} alt={latestUser.fullName} />
              <AvatarFallback>{latestUser.fullName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-lg font-semibold">{latestUser.fullName}</p>
              <p className="text-sm text-muted-foreground">{latestUser.email}</p>
            </div>
          </div>

          {/* Chi tiết */}
          <div className="grid grid-cols-2 gap-4">
            <DetailItem
              label="ID"
              value={<span className="font-mono text-xs bg-muted p-1 rounded">{latestUser.id}</span>}
            />

            <DetailItem
              label="Ngày tham gia"
              value={format(new Date(latestUser.createdAt), "dd/MM/yyyy HH:mm")}
            />

            <DetailItem
              label="Vai trò"
              value={
                <Badge variant={latestUser.role === "ADMIN" ? "destructive" : "outline"}>
                  {latestUser.role}
                </Badge>
              }
            />

            <DetailItem
              label="Trạng thái"
              value={
                <Badge variant={latestUser.status === "ACTIVE" ? "default" : "secondary"}>
                  {latestUser.status === "ACTIVE" ? "Hoạt động" : "Vô hiệu"}
                </Badge>
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
