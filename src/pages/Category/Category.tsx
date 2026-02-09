import { Skeleton } from "@/components/ui/skeleton";
import type { CategorySchema } from "@/schemas/category.schema";
import { getCategories } from "@/services/categories.service";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Category() {
  const [categories, setCategories] = useState<CategorySchema[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-8">
      {loading ? (
        <Skeleton className="h-12 w-64" />
      ) : (
        <h1 className="text-5xl font-bold">Categorias</h1>
      )}

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="p-4 bg-white shadow rounded-lg space-y-3">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))
          : categories.map((cat) => (
              <Link
                key={cat.category_id}
                to={`/categories/${cat.category_id}`}
                className="p-4 bg-white shadow rounded-lg hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold">{cat.name}</h2>
                <p className="opacity-70">{cat.description}</p>
              </Link>
            ))}
      </div>
      <Link to="/">
        <Home />
      </Link>
    </section>
  );
}
