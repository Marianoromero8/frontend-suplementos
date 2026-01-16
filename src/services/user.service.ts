import { userSchema, type User } from "@/schemas/user.schema";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getUsers(): Promise<User[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  console.log("users res status:", res.status);

  if (!res.ok) {
    throw new Error("Error al obtener usuarios");
  }
  console.log(res);
  const data = await res.json();
  return userSchema.array().parse(data);
}
