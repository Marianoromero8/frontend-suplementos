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
import { getUsers } from "@/services/user.service";

export function DashboardUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

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
                      <DropdownMenuItem>
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
