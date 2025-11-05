import { Link, useSearchParams } from "react-router-dom";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "relevancia";

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Suplementos Deportivos</h1>
      <div className="flex gap-2 items-center">
        <input
          className="border rounded px-3 py-2"
          placeholder="Buscar proteína, creatina..."
          defaultValue={q}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = (e.target as HTMLInputElement).value;
              setParams((p) => {
                const next = new URLSearchParams(p);
                next.set("q", val);
                return next;
              });
            }
          }}
        />
        <select
          className="border rounded px-3 py-2"
          value={sort}
          onChange={(e) => {
            setParams((p) => {
              const next = new URLSearchParams(p);
              next.set("sort", e.target.value);
              return next;
            });
          }}
        >
          <option value="relevancia">Relevancia</option>
          <option value="precio_asc">Precio ↑</option>
          <option value="precio_desc">Precio ↓</option>
          <option value="novedades">Novedades</option>
        </select>
      </div>

      <ul className="grid md:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((id) => (
          <li key={id} className="border rounded p-3">
            <h3 className="font-medium">Producto #{id}</h3>
            <p className="text-sm opacity-80">Descripción breve...</p>
            <Link className="underline" to={`/producto/${id}`}>Ver detalle</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
