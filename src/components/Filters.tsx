import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "@/services/categories.service";
import type { CategorySchema } from "@/schemas/category.schema";
import type { ProductSchema } from "@/schemas/product.schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function Filters({ products }: { products: ProductSchema[] }) {
  const [params, setParams] = useSearchParams();

  const category = params.get("category") ?? "";
  const brand = params.get("brand") ?? "";
  const rating = params.get("rating") ?? "";
  const price = params.get("price") ?? "";

  const [categories, setCategories] = useState<CategorySchema[]>([]);

  const minPriceParam = params.get("minPrice") ?? "";
  const maxPriceParam = params.get("maxPrice") ?? "";
  const [minPrice, setMinPrice] = useState<string>(minPriceParam);
  const [maxPrice, setMaxPrice] = useState<string>(maxPriceParam);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const brands = [...new Set(products.map((p) => p.brand))];

  const updateParam = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      value ? next.set(key, value) : next.delete(key);
      return next;
    });
  };

  const clearFilters = () => {
    setParams(new URLSearchParams());
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-center py-4">
      <Select
        value={category}
        onValueChange={(val) => updateParam("category", val)}
      >
        <SelectTrigger className="w-48 ">
          <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorias</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.category_id} value={String(c.category_id)}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={brand} onValueChange={(val) => updateParam("brand", val)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Marcas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las marcas</SelectItem>
          {brands.map((b) => (
            <SelectItem key={b} value={b}>
              {b}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={rating}
        onValueChange={(val) => updateParam("rating", val)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Puntajes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los puntajes</SelectItem>
          <SelectItem value="desc">+ puntaje</SelectItem>
          <SelectItem value="asc">- puntaje</SelectItem>
        </SelectContent>
      </Select>
      <div>
        <input
          type="number"
          placeholder="Precio Min"
          value={minPrice}
          onChange={(e) => {
            const v = e.target.value;
            setMinPrice(v);
            updateParam("minPrice", v || "");
          }}
          className="px-3 py-1 mr-2 border rounded-lg w-30"
        />
        <input
          type="number"
          placeholder="Precio Max"
          value={maxPrice}
          onChange={(e) => {
            const v = e.target.value;
            setMaxPrice(v);
            updateParam("maxPrice", v || "");
          }}
          className="px-3 py-1 ml-2 border rounded-lg w-30"
        />
      </div>
      <Select value={price} onValueChange={(val) => updateParam("price", val)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Precio" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los precios</SelectItem>
          <SelectItem value="desc">Mayor precio</SelectItem>
          <SelectItem value="asc">Menor precio</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="text-[#30292F] bg-blur-3xl"
      >
        Limpiar filtros
      </Button>
    </div>
  );
}
