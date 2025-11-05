import { Link, useParams } from "react-router-dom";

export default function Productdetail() {
  const { id } = useParams();
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Producto #{id}</h1>
      <p className="opacity-80">Ficha técnica, fotos, precio, variantes, etc.</p>
      <div className="flex gap-2">
        <Link className="underline" to="/">Volver al catálogo</Link>
        <Link className="underline" to="/carrito">Ir al carrito</Link>
      </div>
    </section>
  );
}
