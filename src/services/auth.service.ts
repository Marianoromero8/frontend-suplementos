import { loginResponseSchema } from "@/schemas/login.schema";
import type { RegisterSchema } from "@/schemas/user.schema";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function loginRequest(name: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ name, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Credenciales inválidas");
  }

  return loginResponseSchema.parse(data);
}

export async function registerRequest(payload: RegisterSchema) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? "No se pudo registrar");
  }

  return data;
}

export async function forgotPasswordRequest(email: string) {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Error al procesar la solicitud");
  }

  return data;
}
