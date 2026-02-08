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
import { createProduct, editProduct } from "@/services/product.service";
import {
  createProductSchema,
  type CreateProduct,
  type CreateProductFormValues,
} from "@/schemas/product.schema";
import Swal from "sweetalert2";

interface ProductFormSheetProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onCreated?: (product: any) => void;
  productToEdit?: any | null;
}

export function ProductForm({
  open,
  onClose,
  onCreated,
  productToEdit,
}: ProductFormSheetProps) {
  const [categories, setCategories] = useState<CategorySchema[]>([]);
  const isEditing = !!productToEdit;

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
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = form;

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        brand: productToEdit.brand,
        price: productToEdit.price,
        stock: productToEdit.stock,
        description: productToEdit.description,
        category_id: productToEdit.category_id,
      });
    } else {
      reset({
        name: "",
        brand: "",
        price: "",
        stock: "",
        description: "",
        category_id: 0,
        rating: 0,
      });
    }
  }, [productToEdit, reset]);

  const onSubmit: SubmitHandler<CreateProductFormValues> = async (values) => {
    try {
      const parsed: CreateProduct = createProductSchema.parse(values);

      const payload: CreateProduct = {
        ...parsed,
      };
      if (productToEdit) {
        await editProduct(productToEdit.product_id, payload);

        await Swal.fire({
          title: "¡Producto Actualizado!",
          text: `El producto "${payload.name}" se actualizo correctamente`,
          icon: "success",
          confirmButtonColor: "#000",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const created = await createProduct(payload);

        await Swal.fire({
          title: "¡Producto Creado!",
          text: `El producto "${created.name}" fue creado con exito`,
          icon: "success",
          confirmButtonColor: "#000",
          timer: 2000,
          timerProgressBar: true,
        });
      }
      onCreated?.(null);
      reset();
      onClose(true);
      window.location.reload();
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo crear el producto",
        icon: "error",
      });
    }
  };
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] p-5">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? "Editar Producto" : "Crear Producto"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <Input placeholder="Nombre" {...register("name")} />
            {errors.name?.message && (
              <p className="text-[#d11f1f] text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Marca" {...register("brand")} />
            {errors.brand?.message && (
              <p className="text-[#d11f1f] text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <Input type="number" placeholder="Precio" {...register("price")} />
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
            <Input
              type="text"
              placeholder="Descripcion"
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
            {isSubmitting
              ? "Guardando cambios..."
              : isEditing
                ? "Editar Producto"
                : "Crear Producto"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
