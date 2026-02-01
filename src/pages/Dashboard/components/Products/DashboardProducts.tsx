import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
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
import { useEffect, useState, useMemo } from "react";
import { ProductForm } from "./ProductForm";
import type { ProductSchema } from "@/schemas/product.schema";
import { deleteProduct, getProducts } from "@/services/product.service";
import Swal from "sweetalert2";

export function DashboardProducts() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductSchema | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);

  const name = params.get("name") ?? "";
  const [searchProduct, setSearchProduct] = useState<string>(name);
  const stock = params.get("stock") ?? "";

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleEdit = (product: ProductSchema) => {
    setSelectedProduct(product);
    setOpen(true);
  };

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

  const filteredProducts = useMemo(() => {
    const q = (searchProduct ?? "").trim().toLowerCase();
    let list = [...products];

    if (q) {
      list = list.filter((p) => {
        const hay = `${p.name ?? ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (stock === "asc") {
      return list.sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));
    }
    if (stock === "desc") {
      return list.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
    }
    return list;
  }, [products, stock, searchProduct]);

  const productsPaginate = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const updateParam = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      value ? next.set(key, value) : next.delete(key);
      return next;
    });
  };

  // Control de paginado
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    if (page > maxPage) setPage(maxPage);
    if (page < 1) setPage(1);
  }, [filteredProducts.length, pageSize, page, setPage]);

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Productos Disponibles</p>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <PlusCircle />
            Agregar Producto
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <span className="">Order by:</span>
        <Button
          variant="ghost"
          onClick={() => {
            const next = stock === "" ? "asc" : stock === "asc" ? "desc" : "";
            updateParam("stock", next);
          }}
          className="cursor-pointer border-2 w-18"
        >
          Stock
          {stock === "asc" ? " ↑" : stock === "desc" ? " ↓" : ""}
        </Button>

        <span className="">Search:</span>
        <Input
          className="w-75"
          placeholder="Search Product"
          value={searchProduct}
          onChange={(e) => {
            const v = e.target.value;
            setSearchProduct(v);
            updateParam("name", v || "");
          }}
        />

        <span className="">Show:</span>
        <Input
          className="w-30"
          type="number"
          placeholder="Ej: 10"
          min={1}
          max={filteredProducts.length}
          value={pageSize}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < 1) {
              setPageSize(1);
            } else {
              setPageSize(Number(v));
            }
          }}
        />
      </div>
      <div>
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Marca</TableHead>
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
                      <DropdownMenuItem onClick={() => handleEdit(prod)}>
                        <Edit2Icon /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(prod.product_id)}
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
        total={filteredProducts.length}
        onChange={setPage}
      />
      <ProductForm
        open={open}
        onClose={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedProduct(null);
          }
        }}
        productToEdit={selectedProduct}
        onCreated={() => {
          getProducts().then(setProducts);
        }}
      />
    </div>
  );
}
