import type { Product } from "../types/products";
import { Button } from "./ui/button";

interface CardProps {
  product: Product;
}

export function Card({ product }: CardProps) {
  return (
    <div className="w-auto flex flex-col items-center p-4 backdrop-blur-lg rounded-2xl gap-3 border">
      <div className="">
        <h1>{product.name}</h1>
      </div>

      <img src={product.image} alt={product.image} />
      <div className="flex flex-col justify-items-start gap-2">
        <p>{product.description}</p>
        <p>{product.brand}</p>
        <p>${product.price}</p>
      </div>
      <Button type="button" className="">
        Add cart
      </Button>
    </div>
  );
}
