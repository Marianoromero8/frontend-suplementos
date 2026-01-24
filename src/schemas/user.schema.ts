import { z } from "zod";

export const userRoleEnum = z.enum(["ADMIN", "USER"]);

export const userSchema = z.object({
  user_id: z.number().int().nonnegative(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z
    .string()
    .nonempty("El email es obligatorio")
    .email("Debe ser un email válido"),
  address: z.string().min(1, "La dirección debe tener al menos 5 caracteres"),
  role: userRoleEnum,
});

export type User = z.infer<typeof userSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z
    .string()
    .nonempty("El email es obligatorio")
    .email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  role: userRoleEnum,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
