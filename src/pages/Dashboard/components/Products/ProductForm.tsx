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
import { mockCategories } from "@/data/categories.mock";

interface ProductFormSheetProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function ProductForm({
  open,
  onClose,
  onSubmit,
}: ProductFormSheetProps) {
  const categories = mockCategories;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] p-5">
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-6">
          <Input name="name" placeholder="Name" />
          <Input name="brand" placeholder="Brand" />
          <Input name="price" type="number" placeholder="Price" />
          <Input name="stock" type="number" placeholder="Stock" />
          <Select name="category">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem
                  key={cat.category_id}
                  value={String(cat.category_id)}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="file" name="image" placeholder="Image URL" />

          <Button className="w-full">Create Product</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
