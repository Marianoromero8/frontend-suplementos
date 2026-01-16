import { orderSchema, type OrderSchema } from "@/schemas/order.schema";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getOrders(): Promise<OrderSchema[]> {
  const res = await fetch(`${API_URL}/api/orders`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener ordenes");
  }
  console.log(res);
  const data = await res.json();
  return orderSchema.array().parse(data);
}
