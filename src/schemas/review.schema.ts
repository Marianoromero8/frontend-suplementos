import { z } from "zod";

export const reviewSchema = z.object({
  review_id: z.number().int().nonnegative(),
  user_id: z.number().int().nonnegative(),
  product_id: z.number().int().nonnegative(),
  qualification: z.coerce.number().min(1).max(5),
  comment: z.string().min(1, "El comentario no puede estar vacío"),
  date: z.any(),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
