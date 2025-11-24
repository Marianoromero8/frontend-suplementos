import type { CategorySchema } from "@/schemas/category.schema";
import { getCategories } from "@/services/categories.service";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState<CategorySchema[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Categorías</h1>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {categories.map((cat) => (
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
