import type { Product } from "../types/products";

export const mockProducts: Product[] = [
  {
    product_id: 1,
    name: "Whey Protein Isolate",
    price: 29999,
    image: "/images/whey.jpg",
    category_id: 3,
    stock: 15,
    rating: 4.7,
    brand: "Optimun Nutrition",
    description: "Proteína aislada de alto valor biológico.",
  },
  {
    product_id: 2,
    name: "Creatina Monohidratada",
    price: 18999,
    image: "/images/creatina.jpg",
    category_id: 2,
    stock: 40,
    rating: 4.8,
    brand: "MyProtein",
    description: "Creatina micronizada para fuerza y rendimiento.",
  },
];
