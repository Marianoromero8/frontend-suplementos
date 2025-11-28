import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface UserFormProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function UserForm({ open, onClose }: UserFormProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] p-5">
        <SheetHeader>
          <SheetTitle>Create User</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <Input name="name" placeholder="Name" />

          <Input name="email" type="email" placeholder="Email" value="email" />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value="password"
          />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full">Create User</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
