import { z } from "zod";

export const orderDetailSchema = z.object({
  order_detail_id: z.number().int().nonnegative(),
  order_id: z.number().int().nonnegative(),
  product_id: z.number().int().nonnegative(),
  quantity: z.number().int().positive(),
  unit_price: z.string(), // viene como string desde la API
  subtotal: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type OrderDetailSchema = z.infer<typeof orderDetailSchema>;
