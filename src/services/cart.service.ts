import axios from "axios";
import type { ProductSchema } from "@/schemas/product.schema";

export type CartItem = {
  itemId?: number;
  product: ProductSchema;
  quantity: number;
};

// aca lo que conecta con el localstorage ( no backend)
export function loadCart(key: string): CartItem[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];

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

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Obtiene el carrito por usuario
export const getCartByUserId = (userId: number) =>
  axios.get(`${API_URL}/api/carts/user/${userId}`, { headers: authHeaders() });

// Crea el carrito  (OJO user_id)
export const createCart = (userId: number) =>
  axios.post(
    `${API_URL}/api/carts`,
    { user_id: userId },
    { headers: authHeaders() },
  );

// Items por carrito
export const getItemsByCartId = (cartId: number) =>
  axios.get(`${API_URL}/api/itemCarts/cart/${cartId}`, {
    headers: authHeaders(),
  });

// Agregar item (OJO cart_id y product_id)
export const addItemToCart = (
  cartId: number,
  productId: number,
  quantity: number,
) =>
  axios.post(
    `${API_URL}/api/itemCarts`,
    { cart_id: cartId, product_id: productId, quantity },
    { headers: authHeaders() },
  );

// Eliminar item (en backend el id es item_id)
export const deleteItemCart = (itemId: number) =>
  axios.delete(`${API_URL}/api/itemCarts/${itemId}`, {
    headers: authHeaders(),
  });

export const ensureCartAndAddItem = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  let cart;
  try {
    const res = await getCartByUserId(userId);
    cart = res.data;
  } catch {
    const res = await createCart(userId);
    cart = res.data;
  }

  // OJO: cart.cart_id
  return addItemToCart(cart.cart_id, productId, quantity);
};

/**
 * Sincroniza el carrito local (useCart) al backend:
 * 1) obtiene/crea el Cart del usuario
 * 2) borra items existentes del cart en backend (para evitar duplicados)
 * 3) crea un ItemCart por cada item local
 */
export const syncCartToBackend = async (userId: number, items: CartItem[]) => {
  //  obtiene o crea el carrito
  let cart;
  try {
    const res = await getCartByUserId(userId);
    cart = res.data;
  } catch {
    const res = await createCart(userId);
    cart = res.data;
  }

  const cartId: number = cart.cart_id;

  // borro items existentes si es que hay alguno
  try {
    const existing = await getItemsByCartId(cartId);
    const existingItems = Array.isArray(existing.data) ? existing.data : [];
    await Promise.all(
      existingItems
        .filter((i: any) => i?.item_id != null)
        .map((i: any) => deleteItemCart(Number(i.item_id))),
    );
  } catch {
    // si falla el GET, igual intentamos crear los items
  }

  //  crear items del carrito local
  for (const it of items) {
    await addItemToCart(cartId, it.product.product_id, it.quantity);
  }
};
