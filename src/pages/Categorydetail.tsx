import { Link, useParams } from "react-router-dom";

export default function Categorydetail() {
  const { slug } = useParams();
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Categoría: {slug}</h1>
      <p className="opacity-80">Aca se listarían los productos de la categoría "{slug}".</p>
      <Link className="underline" to="/categorias">Volver</Link>
    </section>
  );
}
