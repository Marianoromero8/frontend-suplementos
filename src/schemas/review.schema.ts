import { z } from "zod";

export const reviewSchema = z.object({
  review_id: z.number().int().nonnegative(),
  user_id: z.number().int().nonnegative(),
  product_id: z.number().int().nonnegative(),
  qualification: z.string(),
  comment: z.string().min(1, "El comentario no puede estar vacío"),
  date: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
