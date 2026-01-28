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
  const rawProducts = productSchema.array().parse(data);

  return rawProducts.map((product) => ({
    ...product,
    image: `${API_URL}${product.image}`,
  }));
}

export async function getProductById(
  id: number,
): Promise<ProductSchema | null> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  const data = await res.json();
  const product = productSchema.parse(data);

  return {
    ...product,
    image: `${API_URL}${product.image}`,
  };
}

export async function getProductsByCategory(
  categoryId: number,
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

  return products
    .filter((p) => p.category_id === categoryId)
    .map((product) => ({
      ...product,
      image: `${API_URL}${product.image}`,
    }));
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

export async function editProduct(
  id: number,
  body: CreateProduct,
): Promise<ProductSchema> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar el producto");
  }

  return await response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message ?? "No se pudo eliminar el producto");
  }
}
