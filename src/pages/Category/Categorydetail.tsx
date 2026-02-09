import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategoryById } from "@/services/categories.service";
import { getProductsByCategory } from "@/services/product.service";
import type { CategorySchema } from "@/schemas/category.schema";
import type { ProductSchema } from "@/schemas/product.schema";
import { CardProducts } from "@/components/CardProducts";
import { ArrowLeftIcon } from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

export function Categorydetail() {
  const { id } = useParams();
  const idCat = Number(id);
  const [category, setCategory] = useState<CategorySchema | null>(null);
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!idCat) return;
    setLoading(true);
    getCategoryById(idCat).then((data) => {
      setCategory(data);
    });
    getProductsByCategory(idCat).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [idCat]);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const productsPagination = products.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  useEffect(() => {
    setPage(1);
  }, [category]);

  return (
    <section className="flex flex-col items-center gap-5">
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-center">
          {loading ? (
            <>
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-5 w-64" />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">{category?.name}</h1>
              <p className="opacity-70">{category?.description}</p>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col space-y-3 p-4 border rounded-xl"
            >
              <Skeleton className="h-[200px] w-[250px] rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : productsPagination.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {productsPagination.map((product) => (
            <CardProducts key={product.product_id} product={product} />
          ))}
        </div>
      ) : (
        <p className="flex flex-row justify-center">
          ----- No hay productos en esta categoria -----
        </p>
      )}

      {!loading && products.length > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={products.length}
          onChange={setPage}
        />
      )}

      <Link to="/categories">
        <ArrowLeftIcon></ArrowLeftIcon>
      </Link>
    </section>
  );
}
