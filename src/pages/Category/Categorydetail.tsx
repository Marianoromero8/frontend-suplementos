import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategoryById } from "@/services/categories.service";
import { getProductsByCategory } from "@/services/product.service";
import type { CategorySchema } from "@/schemas/category.schema";
import type { ProductSchema } from "@/schemas/product.schema";
import { CardProducts } from "@/components/CardProducts";
import { ArrowLeftIcon } from "lucide-react";
import { Pagination } from "@/components/Pagination";

export function Categorydetail() {
  const { id } = useParams();
  const idCat = Number(id);
  const [category, setCategory] = useState<CategorySchema | null>(null);
  const [products, setProducts] = useState<ProductSchema[]>([]);

  useEffect(() => {
    if (!idCat) return;
    getCategoryById(idCat).then(setCategory);
    getProductsByCategory(idCat).then(setProducts);
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
          <h1 className="text-4xl font-bold">{category?.name}</h1>
          <p className="opacity-70">{category?.description}</p>
        </div>
      </div>

      {productsPagination.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {productsPagination.map((product) => (
            <CardProducts key={product.product_id} product={product} />
          ))}
        </div>
      ) : (
        <h1>----- Not products in this category -----</h1>
      )}
      {products.length > 0 && (
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
