"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ViewUserDialog } from "./view-user-dialog";
import { deleteUser, type User } from "@/lib/services/users";
import { useToast } from "@/hooks/use-toast";

type UserTableProps = {
  users: User[];
};

const FormattedDate = ({ dateString }: { dateString: string }) => {
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    setDate(format(new Date(dateString), "dd/MM/yyyy"));
  }, [dateString]);

  return <>{date}</>;
};

export function UserTable({ users }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [list, setList] = useState(users);
  const { toast } = useToast();

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteUser(id);
    if (ok) {
      setList(list.filter((u) => u.id !== id));
      toast({ title: "Đã xóa", description: "Người dùng đã bị xóa khỏi hệ thống." });
    } else {
      toast({ variant: "destructive", title: "Lỗi", description: "Không thể xóa người dùng." });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>Tổng quan về tất cả người dùng trong hệ thống.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead className="hidden md:table-cell">Trạng thái</TableHead>
                <TableHead className="hidden md:table-cell">Ngày tham gia</TableHead>
                <TableHead>
                  <span className="sr-only">Hành động</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={user.avatarUrl ?? ""} />
                        <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{user.fullName}</p>
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>

                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "destructive" : "outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>
                      {user.status === "ACTIVE" ? "Hoạt động" : "Vô hiệu"}
                    </Badge>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <FormattedDate dateString={user.createdAt} />
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user.id)}>
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Không có người dùng nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <ViewUserDialog user={selectedUser} open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} />
      )}
    </>
  );
}
