import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function formatMoney(value: number) {
  return value.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

export default function Cart() {
  const { items, subtotal, totalItems, increment, decrement, setQuantity, removeFromCart, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Carrito</h1>
        <p className="opacity-80">Todavía no agregaste productos.</p>
        <Link className="underline" to="/">
          Volver a productos
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Carrito</h1>
          <p className="opacity-80">{totalItems} producto(s) en total</p>
        </div>

        <Button variant="destructive" onClick={clearCart}>
          Vaciar carrito
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.product.product_id}
            className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-xl border border-black/10 p-4"
          >
            <div className="flex items-center gap-4 w-full">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-20 w-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm opacity-80">
                  {formatMoney(item.product.price)} · Stock: {item.product.stock}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decrement(item.product.product_id)}
                disabled={item.quantity <= 1}
                title="Restar"
              >
                <Minus />
              </Button>

              <input
                className="w-16 rounded-md border border-black/20 bg-transparent px-2 py-1 text-center"
                type="number"
                min={1}
                max={item.product.stock}
                value={item.quantity}
                onChange={(e) => setQuantity(item.product.product_id, Number(e.target.value))}
              />

              <Button
                variant="outline"
                size="icon"
                onClick={() => increment(item.product.product_id)}
                disabled={item.quantity >= item.product.stock}
                title="Sumar"
              >
                <Plus />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeFromCart(item.product.product_id)}
                title="Eliminar"
              >
                <Trash2 />
              </Button>
            </div>

            <div className="w-full md:w-40 text-right font-semibold">
              {formatMoney(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="opacity-80">
          <p>Subtotal</p>
          <p className="text-2xl font-semibold opacity-100">{formatMoney(subtotal)}</p>
        </div>

        <div className="flex gap-3">
          <Link to="/">
            <Button variant="outline">Seguir comprando</Button>
          </Link>

          <Link to="/checkout">
            <Button>Confirmar carrito</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}