import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
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
import { Edit2Icon, MoreVertical, Trash, UserPlus} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { UserForm } from "./UserForm";
import type { User } from "@/schemas/user.schema";
import { editUser, getUsers } from "@/services/user.service";
import Swal from "sweetalert2";

export function DashboardUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams()
  const [pageSize, setPageSize] = useState(10)
  const name = params.get("name") ?? "";
  const role = params.get("role") ?? "";
  const [searchUser, setSearchUser] = useState<string>(name)

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const updateParam = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== "") next.set(key, value);
      else next.delete(key);
      return next;
    });
  };

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

  const filteredUsers = useMemo(() => {
    const q = (searchUser ?? "").trim().toLowerCase();
    let list = [...users];

    if (role) {
      const roleNorm = role.toLowerCase();
      list = list.filter((u) => (u.role ?? "").toLowerCase() === roleNorm);
    }

    if (q) {
      list = list.filter((u) => {
        const hay = `${u.name ?? ""} ${u.email ?? ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [users, role, searchUser]);

  const usersPagination = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  // Control de paginado
  useEffect(() => {
     const maxPage = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
     if (page > maxPage) setPage(maxPage);
     if (page < 1) setPage(1);
   }, [filteredUsers.length, pageSize, page, setPage]);
   
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
      <div className="flex items-center justify-start gap-2">

        <span className="">Order by role:</span>
        <Button
          variant="ghost"
          onClick={() => {
            const next = role === "" ? "USER" : role === "USER" ? "ADMIN" : "";
            updateParam("role", next);
          }}
          className="cursor-pointer border-2 w-25"
        >
          Role
          {role === "USER" ? " User" : role === "ADMIN" ? " Admin" : ""}
        </Button>

        <span className="">Search:</span>
        <Input className="w-75"placeholder="Search by either username or email" 
          onChange={(e) => {
            const v = e.target.value
            setSearchUser(v);
            updateParam("name", v || "")
          }}
        />

        <span className="">Show:</span>
        <Input className="w-30" value={pageSize} type="number" placeholder="Ej: 10" min={1} max={filteredUsers.length}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (v < 1){
              setPageSize(1)
            } else {
              setPageSize(Number(v));
            } 
          }}
        />
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
        total={filteredUsers.length}
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
