import type { ProductSchema } from "@/schemas/product.schema";
import { productSchema } from "../schemas/product.schema";
import { mockProducts } from "@/data/products.mock";

export async function getProducts(): Promise<ProductSchema[]> {
  return productSchema.array().parse(mockProducts);
}

export async function getProductById(
  id: number
): Promise<ProductSchema | null> {
  const product = mockProducts.find((p) => p.product_id === id);

  if (!product) return null;

  return productSchema.parse(product);
}
