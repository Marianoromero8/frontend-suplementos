import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { ProductSchema } from "@/schemas/product.schema";
import {
  clearCartStorage,
  loadCart,
  saveCart,
  type CartItem,
  ensureCartAndAddItem,
  getCartByUserId,
  getItemsByCartId,
  deleteItemCart,
} from "@/services/cart.service";
import { useAuth } from "@/contexts/AuthContext";

type CartState = {
  items: CartItem[];
};

type AddPayload = { product: ProductSchema; quantity?: number };

type CartAction =
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "ADD"; payload: AddPayload }
  | { type: "REMOVE"; payload: { productId: number } }
  | { type: "SET_QTY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR" };

function clampQty(qty: number, stock?: number) {
  const safe = Number.isFinite(qty) ? Math.floor(qty) : 1;
  const min = Math.max(1, safe);
  if (typeof stock === "number" && Number.isFinite(stock)) {
    return Math.min(min, Math.max(0, Math.floor(stock)));
  }
  return min;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };

    case "ADD": {
      const { product } = action.payload;
      const addQty = clampQty(action.payload.quantity ?? 1, product.stock);

      const existing = state.items.find((i) => i.product.product_id === product.product_id);
      if (existing) {
        const nextQty = clampQty(existing.quantity + addQty, product.stock);
        return {
          items: state.items.map((i) =>
            i.product.product_id === product.product_id ? { ...i, product, quantity: nextQty } : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: addQty }] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.product.product_id !== action.payload.productId) };

    case "SET_QTY": {
      const { productId, quantity } = action.payload;
      return {
        items: state.items
          .map((i) => {
            if (i.product.product_id !== productId) return i;
            const nextQty = clampQty(quantity, i.product.stock);
            return { ...i, quantity: nextQty };
          })
          .filter((i) => i.quantity > 0),
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;

  addToCart: (product: ProductSchema, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  setQuantity: (productId: number, quantity: number) => void; // por ahora local (no hay PUT en backend)
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clearCart: () => Promise<void>;

  isInCart: (productId: number) => boolean;
  getQuantity: (productId: number) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // ✅ ajustá al campo real de tu user (lo más probable: user.user_id)
  const userId = user?.id;

  // Key por usuario (evita mismo carrito para todos)
  const cartKey = userId ? `cart_items_user_${userId}` : "cart_items_guest";

  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // ✅ Hydrate: invitado => localStorage | logueado => backend (fallback localStorage)
  useEffect(() => {
    const run = async () => {
      if (!userId) {
        dispatch({ type: "HYDRATE", payload: loadCart(cartKey) });
        return;
      }

      try {
        const cartRes = await getCartByUserId(userId);
        const cart = cartRes.data; // debe tener cart_id

        const itemsRes = await getItemsByCartId(cart.cart_id);
        const apiItems = itemsRes.data;


        /**
         *   Esperado :
         * apiItems = [{ item_id, quantity, product: {...} }, ...]
         * Si NO viene product embebido, decime el JSON y lo adaptamos.
         */
        const mapped: CartItem[] = Array.isArray(apiItems)
          ? apiItems
              .filter((it: any) => it?.product && Number(it.quantity) > 0)
              .map((it: any) => ({
                // si tu CartItem no tiene itemId, podés borrar esta línea
                itemId: it.item_id,
                product: it.product,
                quantity: Math.max(1, Math.floor(Number(it.quantity))),
              }))
          : [];

        dispatch({ type: "HYDRATE", payload: mapped });
      } catch {
        // fallback: algo falló (CORS / auth / endpoint), al menos que no quede vacío
        dispatch({ type: "HYDRATE", payload: loadCart(cartKey) });
      }
    };

    run();
  }, [cartKey, userId]);

  // ✅ Persistir SOLO si es invitado
  useEffect(() => {
    if (!userId) saveCart(cartKey, state.items);
  }, [cartKey, state.items, userId]);

  const totalItems = useMemo(() => state.items.reduce((acc, i) => acc + i.quantity, 0), [state.items]);

  const subtotal = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity * i.product.price, 0),
    [state.items],
  );

  // ✅ addToCart: logueado => backend + update optimista | invitado => local
  const addToCart = async (product: ProductSchema, quantity = 1) => {
    if (userId) {
      await ensureCartAndAddItem(userId, product.product_id, quantity);
      dispatch({ type: "ADD", payload: { product, quantity } });
      return;
    }
    dispatch({ type: "ADD", payload: { product, quantity } });
  };

  // ✅ removeFromCart: logueado => backend si tenemos itemId | invitado => local
  const removeFromCart = async (productId: number) => {
    if (userId) {
      const item = state.items.find((i: any) => i.product.product_id === productId);
      const itemId = (item as any)?.itemId;
      if (itemId) {
        await deleteItemCart(itemId);
      }
    }
    dispatch({ type: "REMOVE", payload: { productId } });
  };

  // ⚠️ Por ahora queda local. Para backend hace falta endpoint PUT/PATCH para itemCart
  const setQuantity = (productId: number, quantity: number) =>
    dispatch({ type: "SET_QTY", payload: { productId, quantity } });

  const increment = (productId: number) => {
    const current = state.items.find((i) => i.product.product_id === productId)?.quantity ?? 0;
    setQuantity(productId, current + 1);
  };

  const decrement = (productId: number) => {
    const current = state.items.find((i) => i.product.product_id === productId)?.quantity ?? 0;
    setQuantity(productId, current - 1);
  };

  // ✅ clearCart: logueado => borra items por itemId | invitado => localStorage
  const clearCart = async () => {
    if (userId) {
      const ids = state.items.map((i: any) => i.itemId).filter(Boolean) as number[];
      await Promise.all(ids.map((id) => deleteItemCart(id)));
      dispatch({ type: "CLEAR" });
      return;
    }

    clearCartStorage(cartKey);
    dispatch({ type: "CLEAR" });
  };

  const isInCart = (productId: number) => state.items.some((i) => i.product.product_id === productId);

  const getQuantity = (productId: number) =>
    state.items.find((i) => i.product.product_id === productId)?.quantity ?? 0;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        addToCart,
        removeFromCart,
        setQuantity,
        increment,
        decrement,
        clearCart,
        isInCart,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}