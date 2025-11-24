import { categorySchema } from "@/schemas/category.schema";
import type { CategorySchema } from "@/schemas/category.schema";
import { mockCategories } from "@/data/categories.mock";

export async function getCategories(): Promise<CategorySchema[]> {
  return categorySchema.array().parse(mockCategories);
}

export async function getCategoryById(
  id: number
): Promise<CategorySchema | null> {
  const category = mockCategories.find((c) => c.category_id === id);
  return category ? categorySchema.parse(category) : null;
}
