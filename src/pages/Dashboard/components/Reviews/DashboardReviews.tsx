import { Pagination } from "@/components/Pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StarIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import type { ReviewSchema } from "@/schemas/review.schema";
import type { ProductSchema } from "@/schemas/product.schema";
import { getReviews } from "@/services/review.service";
import { getProducts } from "@/services/product.service";
import { getUsers } from "@/services/user.service";
import type { User } from "@/schemas/user.schema";
import { useSearchParams } from "react-router-dom";

export function DashboardReviews() {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewSchema[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const [params, setParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);

  const qualification = params.get("qualification") ?? "";
  const name = params.get("name") ?? "";
  const ratingParam = params.get("rating") ?? "";
  const [searchProduct, setSearchProduct] = useState<string>(name);

  const updateParam = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      value ? next.set(key, value) : next.delete(key);
      return next;
    });
  };

  useEffect(() => {
    getReviews().then(setReviews);
    getProducts().then(setProducts);
    getUsers().then(setUsers);
  }, []);

  const filteredReviews = useMemo(() => {
    const productMap = new Map<string, string>();
    products.forEach((p) => productMap.set(String(p.product_id), p.name ?? ""));

    let list = [...reviews];

    const q = (searchProduct ?? "").trim().toLowerCase();
    if (q) {
      list = list.filter((r) => {
        const prodName = productMap.get(String(r.product_id)) ?? "";
        return prodName.toLowerCase().includes(q);
      });
    }

    if (ratingParam) {
      const n = Number(ratingParam);
      if (Number.isFinite(n)) {
        list = list.filter((r) => Number(r.qualification) === n);
      }
    }

    if (qualification === "asc") {
      list.sort((a, b) => Number(a.qualification) - Number(b.qualification));
    } else if (qualification === "desc") {
      list.sort((a, b) => Number(b.qualification) - Number(a.qualification));
    }

    return list;
  }, [products, reviews, qualification, searchProduct, ratingParam]);

  const reviewsPagination = filteredReviews.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // Control de paginado
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
    if (page > maxPage) setPage(maxPage);
    if (page < 1) setPage(1);
  }, [filteredReviews.length, pageSize, page, setPage]);

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <span className="">Ordenado por:</span>
        <Button
          variant="ghost"
          onClick={() => {
            const next =
              qualification === ""
                ? "asc"
                : qualification === "asc"
                  ? "desc"
                  : "";
            updateParam("qualification", next);
          }}
          className="cursor-pointer border-2 w-18"
        >
          Puntaje
          {qualification === "asc"
            ? " ↑"
            : qualification === "desc"
              ? " ↓"
              : ""}
        </Button>

        <span className="">Buscar Producto:</span>
        <Input
          className="w-75"
          placeholder="Search Product"
          value={searchProduct}
          onChange={(e) => {
            const v = e.target.value;
            setSearchProduct(v);
            updateParam("name", v || "");
            setPage(1);
          }}
        />

        <span className="">Mostrar:</span>
        <Input
          className="w-30"
          type="number"
          placeholder="Ej: 10"
          min={1}
          max={filteredReviews.length}
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Puntaje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewsPagination.map((rev) => {
              const product = products.find(
                (prod) => String(prod.product_id) === String(rev.product_id),
              );
              const user = users.find(
                (user) => String(user.user_id) === String(rev.user_id),
              );
              return (
                <TableRow key={rev.review_id}>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{rev.comment}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="flex flex-row items-center gap-2 ">
                    <StarIcon className="text-[#fcf811fa] fill-[#fcf811fa]" />
                    {rev.qualification}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={filteredReviews.length}
        onChange={setPage}
      />
    </div>
  );
}
