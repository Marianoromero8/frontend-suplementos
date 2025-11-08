// src/data/mockLoginData.ts

// 🔹 Roles posibles
export type UserRole = "user" | "admin";

// 🔹 Interfaz del usuario
export interface UserMock {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// 🔹 Datos falsos para probar login
export const mockUsers: UserMock[] = [
  {
    id: 1,
    name: "Mariano",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "Juli",
    email: "user@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 3,
    name: "Ana",
    email: "ana@example.com",
    password: "abcdef",
    role: "user",
  },
];
