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
import { Edit2Icon, MoreVertical, PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { CategorySchema } from "@/schemas/category.schema";
import { deleteCategory, getCategories } from "@/services/categories.service";
import Swal from "sweetalert2";
import { CategoryForm } from "./CategoryForm";

export function DashboardCategories() {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<CategorySchema[]>([]);
  const pageSize = 10;
  const [open, setOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategorySchema | null>(
    null,
  );
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleOpenEdit = (category: CategorySchema) => {
    setCategoryToEdit(category);
    setOpen(true);
  };

  const handleOpenCreate = () => {
    setCategoryToEdit(null);
    setOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: `¿Eliminar ${name}?`,
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(id);
        await Swal.fire(
          "¡Eliminado!",
          "La categoria ha sido borrada.",
          "success",
        );
        window.location.reload();
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const categoriesPagination = categories.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categorias</h1>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={handleOpenCreate}
            className="cursor-pointer"
          >
            <PlusCircle />
            Agregar Categoria
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Descripcion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesPagination.map((cat) => (
              <TableRow key={cat.category_id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost">
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleOpenEdit(cat)}>
                        <Edit2Icon /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(cat.category_id, cat.name)}
                      >
                        <Trash /> Eliminar
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
        total={categories.length}
        onChange={setPage}
      />

      <CategoryForm
        open={open}
        onClose={setOpen}
        categoryToEdit={categoryToEdit}
        onSuccess={() => getCategories().then(setCategories)}
      />
    </div>
  );
}
