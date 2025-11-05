import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">404 – Página no encontrada</h1>
      <Link className="underline" to="/">Volver al inicio</Link>
    </section>
  );
}
