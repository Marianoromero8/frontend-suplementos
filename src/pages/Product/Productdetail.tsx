import { Button } from "@/components/ui/button";
import type { ProductSchema } from "@/schemas/product.schema";
import { getProductById } from "@/services/product.service";
import {
  ArrowLeftIcon,
  ShoppingBasket,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Productdetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductSchema | null>(null);

  useEffect(() => {
    try {
      if (!id) return;

      getProductById(Number(id)).then((data) => setProduct(data));
    } catch (error) {
      throw new Error("No se encuentra informacion del producto");
    }
  }, [id]);

  return (
    <section className="space-y-2 flex flex-col items-center">
      <h1 className="text-5xl font-semibold">
        {product?.name} #{product?.product_id}
      </h1>
      <div className="text-xl flex flex-col justify-center items-center gap-5 p-5">
        <h2 className="text-3xl flex justify-center">{product?.brand}</h2>
        <img src={product?.image} alt="" className="w-72 h-96" />
        <p>{product?.description}</p>
        <div className="flex flex-row gap-2 items-center">
          <p className="font-bold">${product?.price}</p>
          <Star className="text-[#fae843] fill-[#fae843]" />
          <p>{product?.rating}</p>
        </div>
        {/* Agregar al carrito */}
        <Button className="w-fit">
          <ShoppingBasket />
        </Button>
      </div>
      <div className="flex gap-8">
        <Link className="underline" to="/">
          <ArrowLeftIcon></ArrowLeftIcon>
        </Link>
        <Link className="underline" to="/cart">
          <ShoppingCart></ShoppingCart>
        </Link>
      </div>
    </section>
  );
}
