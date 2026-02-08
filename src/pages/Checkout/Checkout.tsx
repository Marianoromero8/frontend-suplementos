import Swal from "sweetalert2";
import { useCart } from "@/contexts/CartContext";
import { checkoutOrder } from "../../services/orders.service";
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
      confirmButtonText: "Confirmar ahora",
      cancelButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "Confirmando orden...",
      text: "No cierres la ventana",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Sesión no válida.");

      await syncCartToBackend(user.id, items);

      const orderCreated = await checkoutOrder(user.id, token);

      Swal.close();

      clearCart();

      await Swal.fire({
        icon: "success",
        title: "¡Confirmación exitosa!",
        text: `Tu orden N°${orderCreated.order_id} fue generada correctamente`,
        confirmButtonText: "Continuar",
      });

      navigate("/checkout/paid");
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un fallo al procesar el pedido.",
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
