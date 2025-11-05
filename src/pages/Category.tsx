import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();
  const categorias = [
    { slug: "proteinas", nombre: "Proteínas" },
    { slug: "creatinas", nombre: "Creatinas" },
    { slug: "preentrenos", nombre: "Pre‑entrenos" },
  ];
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Categorías</h1>
      <ul className="grid md:grid-cols-3 gap-4">
        {categorias.map((c) => (
          <li key={c.slug} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <span>{c.nombre}</span>
              <button className="underline" onClick={() => navigate(`/categoria/${c.slug}`)}>
                Ver
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
