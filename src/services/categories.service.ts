import { categorySchema, type CategorySchema } from "@/schemas/category.schema";
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getCategories(): Promise<CategorySchema[]> {
  const res = await fetch(`${API_URL}/api/categories`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }
  console.log(res);
  const data = await res.json();
  return categorySchema.array().parse(data);
}

export async function getCategoryById(id: number): Promise<CategorySchema> {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  const data = await res.json();
  return categorySchema.parse(data);
}

export async function createCategory(
  category: Omit<CategorySchema, "category_id">,
): Promise<CategorySchema> {
  const res = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
}

export async function updateCategory(
  id: number,
  category: Partial<CategorySchema>,
): Promise<CategorySchema> {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "DELETE",
    headers: { "x-api-key": API_KEY },
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
}
