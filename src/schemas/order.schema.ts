import { z } from "zod";
import { orderDetailSchema } from "./orderDetail.schema";

export const orderSchema = z.object({
  order_id: z.number().int().nonnegative(),
  user_id: z.number().int().nonnegative(),
  status: z.enum(["paid", "pending", "cancel"]),
  total: z.string(),
  order_date: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  details: z.array(orderDetailSchema),
});

export type OrderSchema = z.infer<typeof orderSchema>;
