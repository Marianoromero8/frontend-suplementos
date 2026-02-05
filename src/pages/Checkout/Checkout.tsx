import Swal from "sweetalert2";
import { useCart } from "@/contexts/CartContext";
import { checkoutOrder, } from "../../services/orders.service";
import { syncCartToBackend } from "@/services/cart.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth(); //
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión para comprar", "error");
      return;
    }

    if (items.length === 0) return;

    const confirm = await Swal.fire({
      title: "¿Confirmar pedido?",
      text: `Total: $${subtotal.toLocaleString("es-AR")}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "confirmar ahora",
      cancelButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "confirmando orden...",
      text: "No cierres la ventana",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Sesión no válida.");

      // 1) sincroniza el carrito local -> backend (crea Cart si no existe)
      await syncCartToBackend(user.id, items);

      // console.log("Iniciando checkout para usuario ID:", user.id);
      Swal.update({ title: "Generando orden..." });
      const orderCreated = await checkoutOrder(user.id, token);

      clearCart();
      await Swal.fire({
        icon: "success",
        title: "¡confirmacion Exitosa!",
        text: `Orden #${orderCreated.order_id} confirmada.`,
      });

      navigate("/checkout/paid");
    } catch (error) {
      console.error("Error en el proceso:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un fallo al procesar el carrito. Asegúrate de tener items guardados.",
      });
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 space-y-4 border rounded-xl shadow-sm mt-10">
      <h1 className="text-2xl font-bold">Resumen del pedido</h1>

      <div className="space-y-2 border-b pb-4">
        {items.map((item) => (
          <div
            key={item.product.product_id}
            className="flex justify-between text-sm"
          >
            <span>
              {item.product.name} x{item.quantity}
            </span>
            <span>
              ${(item.product.price * item.quantity).toLocaleString("es-AR")}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-bold text-xl py-2">
        <span>Total</span>
        <span>${subtotal.toLocaleString("es-AR")}</span>
      </div>
      <button
        onClick={handlePayment}
        className="w-full bg-[#0b2deb] text-[#ffff] py-3 rounded-lg font-bold hover:bg-[#435df1] transition-all"
      >
        Confirmar
      </button>
    </section>
  );
}
