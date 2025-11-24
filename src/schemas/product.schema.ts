import { z } from "zod";

export const productSchema = z.object({
  product_id: z.coerce.number().int().nonnegative(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  price: z.coerce.number().nonnegative("El precio no puede ser negativo"),
  image: z.string().min(1, "La imagen es obligatoria"),
  category_id: z.coerce.number().int().positive(),
  stock: z.coerce.number().int().nonnegative("El stock no puede ser negativo"),
  rating: z.coerce.number().min(0).max(5).optional(),
  brand: z.string().min(2, "La marca debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const createProductSchema = productSchema.omit({
  product_id: true,
  rating: true,
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
