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

export const createProductSchema = z.object({
  name: z.string().min(2, "Nombre obligatorio"),
  brand: z.string().min(2, "Marca obligatoria"),
  price: z.coerce.number().positive("Precio inválido"),
  stock: z.coerce.number().int().nonnegative("Stock inválido"),
  rating: z.coerce.number().min(0).max(5).optional(),
  description: z.string().min(5, "Descripcion obligatoria"),
  category_id: z.coerce.number().int().positive("Categoría obligatoria"),
});
export type CreateProductFormValues = z.input<typeof createProductSchema>;

export type CreateProduct = z.infer<typeof createProductSchema>;
