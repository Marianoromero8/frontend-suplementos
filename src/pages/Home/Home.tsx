import { Link, useSearchParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/services/product.service";
import type { ProductSchema } from "@/schemas/product.schema";
import { Filters } from "../../components/Filters";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "";
  const brand = params.get("brand") ?? "";
  const rating = params.get("rating") ?? "";
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
      .sort((a, b) => {
        const ar = a.rating ?? 0;
        const br = b.rating ?? 0;
        if (rating === "desc") return br - ar;
        if (rating === "asc") return ar - br;
        return 0;
      });
  }, [products, category, brand, rating]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold flex justify-center">
        Suplementos Deportivos
      </h1>

      <Filters products={products} />

      <div className="grid md:grid-cols-4 justify-center gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.product_id}
              to={`/product/${product.product_id}`}
            >
              <Card product={product} />
            </Link>
          ))
        ) : (
          <p>Product, Brand or Category Not Found</p>
        )}
      </div>
    </section>
  );
}
