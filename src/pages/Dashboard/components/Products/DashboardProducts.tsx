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
import { ProductForm } from "./ProductForm";
import type { ProductSchema } from "@/schemas/product.schema";
import { deleteProduct, getProducts } from "@/services/product.service";
import Swal from "sweetalert2";

export function DashboardProducts() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const productsPaginate = products.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        Swal.fire("¡Eliminado!", "El producto ha sido borrado.", "success");
        window.location.reload();
      } catch (error) {
        Swal.fire("Error", "error");
      }
    }
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Products available</p>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <PlusCircle />
            Add Product
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Config</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsPaginate.map((prod) => (
              <TableRow key={prod.product_id}>
                <TableCell className="font-semibold">{prod.name}</TableCell>
                <TableCell>{prod.brand}</TableCell>
                <TableCell className="font-bold">{prod.stock}</TableCell>
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
                      <DropdownMenuItem
                        onClick={() => handleDelete(prod.product_id)}
                      >
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
        total={products.length}
        onChange={setPage}
      />
      <ProductForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
