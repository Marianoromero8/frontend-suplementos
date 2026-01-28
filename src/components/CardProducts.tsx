import { ShoppingBasket, Star } from "lucide-react";
import { Button } from "./ui/button";
import type { ProductSchema } from "@/schemas/product.schema";
import { useCart } from "@/contexts/CartContext";

interface CardProps {
  product: ProductSchema;
}

export function CardProducts({ product }: CardProps) {
  const { addToCart } = useCart();

  const disabled = product.stock === 0;
  return (
    <div className="w-72 flex flex-col p-4 justify-between h-full backdrop-blur-lg rounded-2xl gap-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold">{product.name}</h1>
        <img src={product.image} alt={product.name} className="w-48 h-60 object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold">${product.price}</p>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <Star className="text-[#fae843] fill-[#fae843]" />
        <p>{product.rating ?? 0}</p>
        <span className="ml-auto text-sm opacity-80">Stock: {product.stock}</span>
      </div>

      <div className="flex justify-end">
        <Button
          className="flex align-center w-fit cursor-pointer"
          onClick={() => addToCart(product, 1)}
          disabled={disabled}
          title={disabled ? "Sin stock" : "Agregar al carrito"}
        >
          <ShoppingBasket />
        </Button>
      </div>
    </div>
  );
}