import type { ProductSchema } from "@/schemas/product.schema";

export type CartItem = {
  product: ProductSchema;
  quantity: number;
};

const STORAGE_KEY = "cart";

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    // Basic sanity: quantity >= 1 and product_id exists
    return parsed
      .filter((i) => i?.product?.product_id != null && Number(i.quantity) > 0)
      .map((i) => ({ ...i, quantity: Math.max(1, Math.floor(Number(i.quantity))) }));
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function clearCartStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
