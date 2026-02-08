import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().nonempty("El email es obligatorio"),
  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    user_id: z.number().int().nonnegative(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["ADMIN", "USER"]),
  }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
