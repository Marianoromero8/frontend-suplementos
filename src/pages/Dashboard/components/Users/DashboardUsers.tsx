import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit2Icon, MoreVertical, Trash, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { UserForm } from "./UserForm";
import type { User } from "@/schemas/user.schema";
import { editUser, getUsers } from "@/services/user.service";
import Swal from "sweetalert2";

export function DashboardUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleEditRole = async (userId: number, currentRole: string) => {
    const { value: newRole } = await Swal.fire({
      title: "Change User Role",
      input: "select",
      inputOptions: {
        USER: "User",
        ADMIN: "Admin",
      },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#3b82f6",
    });

    if (newRole && newRole !== currentRole) {
      try {
        await editUser(userId, { role: newRole });

        setUsers((prev) =>
          prev.map((u) =>
            u.user_id === userId
              ? { ...u, role: newRole as "USER" | "ADMIN" }
              : u,
          ),
        );

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `New role:  ${newRole}`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error: any) {
        Swal.fire("Error", error.message || "Failed to update role", "error");
      }
    }
  };

  const usersPagination = users.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Users Register</p>
        </div>
        <div>
          <Button
            variant="ghost"
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <UserPlus />
            Add User
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersPagination.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell className="font-semibold">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost">
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleEditRole(user.user_id, user.role)}
                      >
                        <Edit2Icon /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={users.length}
        onChange={setPage}
      />
      <UserForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
