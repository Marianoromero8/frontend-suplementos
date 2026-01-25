import { Link, useSearchParams } from "react-router-dom";
import { CardProducts } from "../../components/CardProducts";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/services/product.service";
import type { ProductSchema } from "@/schemas/product.schema";
import { Filters } from "../../components/Filters";
import { Pagination } from "@/components/Pagination";

export function Home() {
  const [params] = useSearchParams();
  const category = params.get("category") ?? "";
  const brand = params.get("brand") ?? "";
  const rating = params.get("rating") ?? "";
  const price = params.get("price") ?? "";
  const maxPrice = params.get("maxPrice") ?? "";
  const minPrice = params.get("minPrice") ?? "";
  const [products, setProducts] = useState<ProductSchema[]>([]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        category !== "all" && category !== ""
          ? p.category_id === Number(category)
          : true
      )
      .filter((p) =>
        brand !== "all" && brand !== ""
          ? p.brand.toLowerCase() === brand.toLowerCase()
          : true
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
    getProducts().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category, brand, rating]);

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const productsHome = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <section className="space-y-4">
      <h1 className="text-5xl font-bold flex justify-center">
        Suplementos Deportivos
      </h1>

      <Filters products={products} />

      <div className="grid md:grid-cols-4 justify-center gap-8">
        {productsHome.length > 0 ? (
          productsHome.map((product) => (
            <Link
              key={product.product_id}
              to={`/product/${product.product_id}`}
            >
              <CardProducts product={product} />
            </Link>
          ))
        ) : (
          <p>Product, Brand or Category Not Found</p>
        )}
      </div>
      {filteredProducts.length > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={filteredProducts.length}
          onChange={setPage}
        />
      )}
    </section>
  );
}
