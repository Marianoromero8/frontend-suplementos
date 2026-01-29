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

export async function createOrder(orderData: any): Promise<OrderSchema> {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error("Error al crear la orden");
  const data = await res.json();
  return orderSchema.parse(data);
}

export async function checkoutOrder(userId: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/orders/checkout/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) throw new Error("Error en el checkout");
}

export async function updateOrderStatus(
  orderId: number,
  status: string,
): Promise<OrderSchema> {
  const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Error al actualizar estado");
  const data = await res.json();
  return orderSchema.parse(data);
}
