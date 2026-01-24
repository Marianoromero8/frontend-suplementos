import { z } from "zod";

export const categorySchema = z.object({
  category_id: z.number().int().nonnegative(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
});

export const categoryFormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
