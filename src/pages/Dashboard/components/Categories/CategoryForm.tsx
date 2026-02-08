import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryFormSchema,
  type CategoryFormSchema,
  type CategorySchema,
} from "@/schemas/category.schema";
import { createCategory, updateCategory } from "@/services/categories.service";
import Swal from "sweetalert2";

interface CategoryFormProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onSuccess?: () => void;
  categoryToEdit?: CategorySchema | null;
}

export function CategoryForm({
  open,
  onClose,
  onSuccess,
  categoryToEdit,
}: CategoryFormProps) {
  const isEditing = !!categoryToEdit;

  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = form;

  useEffect(() => {
    if (categoryToEdit) {
      reset({
        name: categoryToEdit.name,
        description: categoryToEdit.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [categoryToEdit, reset, open]);

  const onSubmit: SubmitHandler<CategoryFormSchema> = async (values) => {
    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.category_id, values);

        await Swal.fire({
          title: "¡Categoria Actualizada!",
          text: `La categoria se actualizo correctamente`,
          icon: "success",
          confirmButtonColor: "#000",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        await createCategory(values);

        await Swal.fire({
          title: "¡Categoria Creada!",
          text: `La categoria "${values.name}" fue creada con exito`,
          icon: "success",
          confirmButtonColor: "#000",
          timer: 2000,
          timerProgressBar: true,
        });
      }

      onSuccess?.();
      onClose(false);
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "Hubo un problema con la operacion",
        icon: "error",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] p-5">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? "Editar Categoria" : "Nueva Categoria"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="space-y-1">
            <Input
              placeholder="Nombre de la categoria"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name?.message && (
              <p className="text-[#d11f1f] text-xs font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Descripcion"
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description?.message && (
              <p className="text-[#d11f1f] text-xs font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Cargando..."
              : isEditing
                ? "Guardar Cambios"
                : "Crear Categoria"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
