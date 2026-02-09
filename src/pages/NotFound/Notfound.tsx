import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-6xl font-semibold">404 – Página no encontrada</h1>
      <Link className="underline" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
