import type { CreateProduct, ProductSchema } from "@/schemas/product.schema";
import { productSchema } from "../schemas/product.schema";
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getProducts(): Promise<ProductSchema[]> {
  const res = await fetch(`${API_URL}/api/products`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();
  return productSchema.array().parse(data);
}

export async function getProductById(
  id: number
): Promise<ProductSchema | null> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  const data = await res.json();
  return productSchema.parse(data);
}

export async function getProductsByCategory(
  categoryId: number
): Promise<ProductSchema[]> {
  const res = await fetch(`${API_URL}/api/products`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Error al obtener productos: ${res.status}`);
  }

  const data = await res.json();
  const products = productSchema.array().parse(data);

  return products.filter((p) => p.category_id === categoryId);
}

export async function createProduct(payload: CreateProduct) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);
  console.log("POST /api/products status:", res.status);
  console.log("Response body:", data);
  if (!res.ok) {
    throw new Error(data?.message ?? "No se pudo crear el producto");
  }

  return data;
}
