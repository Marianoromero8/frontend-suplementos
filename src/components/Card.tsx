import { ShoppingBasket, Star } from "lucide-react";
import { Button } from "./ui/button";
import type { ProductSchema } from "@/schemas/product.schema";

interface CardProps {
  product: ProductSchema;
}

export function Card({ product }: CardProps) {
  return (
    <div className="w-72 flex flex-col p-4 justify-between h-full backdrop-blur-lg rounded-2xl gap-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold">{product.name}</h1>
        <img src={product.image} alt={product.image} className="w-48 h-60" />
      </div>

      <div className="flex flex-col gap-2">
        <p>{product.description}</p>
        <p className="text-2xl font-semibold">${product.price}</p>
      </div>
      <div className="flex flex-row gap-1">
        <Star className="text-[#fae843] fill-[#fae843]" />
        <p>{product.rating}</p>
      </div>
      <div className="flex justify-end">
        <Button className="flex align-center w-fit cursor-pointer">
          <ShoppingBasket />
        </Button>
      </div>
    </div>
  );
}
