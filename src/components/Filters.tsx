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
  };

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-center py-4">
      <Select
        value={category}
        onValueChange={(val) => updateParam("category", val)}
      >
        <SelectTrigger className="w-48 ">
          <SelectValue placeholder="Categoríes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.category_id} value={String(c.category_id)}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={brand} onValueChange={(val) => updateParam("brand", val)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
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
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ratings</SelectItem>
          <SelectItem value="desc">+ rating</SelectItem>
          <SelectItem value="asc">- rating</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={price}
        onValueChange={(val) => updateParam("price", val)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All prices</SelectItem>
          <SelectItem value="desc">more expensive</SelectItem>
          <SelectItem value="asc">less expensive</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="text-[#30292F] bg-blur-3xl"
      >
        Clean filters
      </Button>
    </div>
  );
}
