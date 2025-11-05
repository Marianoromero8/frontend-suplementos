import { useLocation, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";
  return (
    <section className="space-y-4 max-w-md">
      <h1 className="text-2xl font-semibold">Ingresar</h1>
      <p className="opacity-80 text-sm">Demo: al hacer clic, simula login y vuelve a la ruta previa.</p>
      <button
        className="border rounded px-4 py-2"
        onClick={() => {
          alert("Simular login: reemplaza con la lógica real");
          navigate(from, { replace: true });
        }}
      >
        Ingresar
      </button>
    </section>
  );
}
