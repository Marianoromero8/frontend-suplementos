// src/data/mockUsers.ts
export type UserRole = "user" | "admin";

export interface UserMock {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

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
    name: "Julieta",
    email: "julieta@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 3,
    name: "Ana Torres",
    email: "ana@example.com",
    password: "abcdef",
    role: "user",
  },
  {
    id: 4,
    name: "Lucas Pérez",
    email: "lucasp@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 5,
    name: "Micaela Ríos",
    email: "mica@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 6,
    name: "Rodrigo Díaz",
    email: "rodrigo@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 7,
    name: "Camila Sánchez",
    email: "camila@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 8,
    name: "Franco López",
    email: "franco@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 9,
    name: "Valentina Ruiz",
    email: "valen@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 10,
    name: "Andrés Gómez",
    email: "andres@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 11,
    name: "Sofía Blanco",
    email: "sofia@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 12,
    name: "Nicolás Vera",
    email: "nico@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 13,
    name: "Martina Herrera",
    email: "martina@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 14,
    name: "Gustavo Medina",
    email: "gusta@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 15,
    name: "Carla López",
    email: "carla@example.com",
    password: "123456",
    role: "user",
  },
];
