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
import type { CategorySchema } from "@/schemas/category.schema";
import { getCategories } from "@/services/categories.service";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/services/product.service";
import {
  createProductSchema,
  type CreateProduct,
  type CreateProductFormValues,
} from "@/schemas/product.schema";

interface ProductFormSheetProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onCreated?: (product: any) => void; // opcional: para refrescar lista
}

export function ProductForm({
  open,
  onClose,
  onCreated,
}: ProductFormSheetProps) {
  const [categories, setCategories] = useState<CategorySchema[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      stock: "",
      rating: 0,
      description: "",
      category_id: 0,
      image: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = form;

  const onSubmit: SubmitHandler<CreateProductFormValues> = async (values) => {
    const parsed: CreateProduct = createProductSchema.parse(values);

    const payload: CreateProduct = {
      ...parsed,
      image: parsed.image?.trim() ? parsed.image.trim() : undefined,
    };
    const created = await createProduct(payload);
    onCreated?.(created);
    reset();
    onClose(true);
  };
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] p-5">
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <Input placeholder="Name" {...register("name")} />
            {errors.name?.message && (
              <p className="text-[#d11f1f] text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Brand" {...register("brand")} />
            {errors.brand?.message && (
              <p className="text-[#d11f1f] text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <Input type="number" placeholder="Price" {...register("price")} />
            {errors.price?.message && (
              <p className="text-[#d11f1f] text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Input type="number" placeholder="Stock" {...register("stock")} />
            {errors.stock?.message && (
              <p className="text-[#d11f1f] text-sm">{errors.stock.message}</p>
            )}
          </div>
          <div>
            <Input type="rating" placeholder="Rating" {...register("rating")} />
            {errors.rating?.message && (
              <p className="text-[#d11f1f] text-sm">{errors.rating.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Description"
              {...register("description")}
            />
            {errors.description?.message && (
              <p className="text-[#d11f1f] text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Select
              onValueChange={(v) =>
                setValue("category_id", Number(v), { shouldValidate: true })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
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
            {errors.category_id?.message && (
              <p className="text-[#d11f1f] text-sm">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
