import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { ProductSchema } from "@/schemas/product.schema";
import { clearCartStorage, loadCart, saveCart, type CartItem } from "@/services/cart.service";

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

  addToCart: (product: ProductSchema, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clearCart: () => void;

  isInCart: (productId: number) => boolean;
  getQuantity: (productId: number) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate once
  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: loadCart() });
  }, []);

  // Persist on change
  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity * i.product.price, 0),
    [state.items],
  );

  const addToCart = (product: ProductSchema, quantity = 1) =>
    dispatch({ type: "ADD", payload: { product, quantity } });

  const removeFromCart = (productId: number) =>
    dispatch({ type: "REMOVE", payload: { productId } });

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

  const clearCart = () => {
    clearCartStorage();
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