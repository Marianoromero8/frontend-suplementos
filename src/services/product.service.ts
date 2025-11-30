import type { ProductSchema } from "@/schemas/product.schema";
import { productSchema } from "../schemas/product.schema";
import { mockProducts } from "@/data/products.mock";

export async function getProducts(): Promise<ProductSchema[]> {
  //   const res = await fetch(`${API_URL}/products`);
  //   const data = await res.json();
  //   return productSchema.array().parse(data);
  return productSchema.array().parse(mockProducts);
}

export async function getProductById(
  id: number
): Promise<ProductSchema | null> {
  const product = mockProducts.find((p) => p.product_id === id);

  if (!product) return null;

  return productSchema.parse(product);
}

export async function getProductsByCategory(
  categoryId: number
): Promise<ProductSchema[]> {
  const filtered = mockProducts.filter((p) => p.category_id === categoryId);
  return productSchema.array().parse(filtered);
}
