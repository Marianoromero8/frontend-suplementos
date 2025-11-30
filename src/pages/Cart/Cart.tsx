import { Link } from "react-router-dom";
export default function Cart() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Carrito</h1>
      <p className="opacity-80">Productos añadidos, totales y acciones de checkout.</p>
      <Link className="underline" to="/checkout">Continuar al pago</Link>
    </section>
  );
}
