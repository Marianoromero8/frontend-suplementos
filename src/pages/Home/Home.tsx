import { useSearchParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { mockProducts } from "../../data/products.mock";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "relevancia";

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold flex justify-center">
        Suplementos Deportivos
      </h1>
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

      <div className="grid md:grid-cols-3 gap-4">
        {mockProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
