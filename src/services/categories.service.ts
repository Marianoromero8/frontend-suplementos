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

// export async function deleteCategory(id: number): Promise<CategorySchema> {}
