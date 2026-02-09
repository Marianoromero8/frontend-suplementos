import { useSearchParams } from "react-router-dom";
import { CardProducts } from "../../components/CardProducts";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/services/product.service";
import type { ProductSchema } from "@/schemas/product.schema";
import { Filters } from "../../components/Filters";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

export function Home() {
  const [params] = useSearchParams();
  const category = params.get("category") ?? "";
  const brand = params.get("brand") ?? "";
  const rating = params.get("rating") ?? "";
  const price = params.get("price") ?? "";
  const maxPrice = params.get("maxPrice") ?? "";
  const minPrice = params.get("minPrice") ?? "";
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        category !== "all" && category !== ""
          ? p.category_id === Number(category)
          : true,
      )
      .filter((p) =>
        brand !== "all" && brand !== ""
          ? p.brand.toLowerCase() === brand.toLowerCase()
          : true,
      )
      .filter((p) => {
        const pPrice = Number(p.price ?? 0);
        const min = minPrice !== "" ? Number(minPrice) : null;
        const max = maxPrice !== "" ? Number(maxPrice) : null;
        if (min !== null && max !== null) return pPrice >= min && pPrice <= max;
        if (min !== null) return pPrice >= min;
        if (max !== null) return pPrice <= max;
        return true;
      })
      .sort((a, b) => {
        const ar = a.rating ?? 0;
        const br = b.rating ?? 0;
        if (rating === "desc") return br - ar;
        if (rating === "asc") return ar - br;
        return 0;
      })
      .sort((a, b) => {
        const ap = a.price ?? 0;
        const bp = b.price ?? 0;
        if (price === "desc") return bp - ap;
        if (price === "asc") return ap - bp;
        return 0;
      });
  }, [products, category, brand, rating, price, minPrice, maxPrice]);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category, brand, rating]);

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const productsHome = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <section className="space-y-4">
      {loading ? (
        <div className="flex justify-center">
          <Skeleton className="h-12 w-2/3 md:w-1/2" />
        </div>
      ) : (
        <h1 className="text-5xl font-bold flex justify-center text-center">
          Suplementos Deportivos
        </h1>
      )}

      {loading ? (
        <div className="flex flex-wrap gap-4 justify-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : (
        <Filters products={products} />
      )}

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  justify-center gap-8">
        {loading ? (
          // Generamos 8 cuadros de carga
          Array.from({ length: pageSize }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col space-y-3 p-4 border rounded-xl"
            >
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))
        ) : productsHome.length > 0 ? (
          productsHome.map((product) => (
            <CardProducts key={product.product_id} product={product} />
          ))
        ) : (
          <p className="flex flex-row justify-center">
            Producto, Categoria o Marca no encontrado
          </p>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      ) : (
        filteredProducts.length > 0 && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={setPage}
          />
        )
      )}
    </section>
  );
}
