import type { ProductSchema } from "@/schemas/product.schema";

export type CartItem = {
  product: ProductSchema;
  quantity: number;
};

export function loadCart(key: string): CartItem[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];

    // Sanity check
    return parsed
      .filter((i) => i?.product?.product_id != null && Number(i.quantity) > 0)
      .map((i) => ({
        ...i,
        quantity: Math.max(1, Math.floor(Number(i.quantity))),
      }));
  } catch {
    return [];
  }
}

export function saveCart(key: string, items: CartItem[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function clearCartStorage(key: string) {
  localStorage.removeItem(key);
}