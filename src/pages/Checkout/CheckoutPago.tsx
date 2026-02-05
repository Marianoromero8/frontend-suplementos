
import {
  getOrdersByUserId,
} from "@/services/user.service";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { OrderSchema } from "@/schemas/order.schema";
import { Link } from "react-router-dom";

export default function CheckoutPago() {
    const { user } = useAuth();

    const [orders, setOrders] = useState<OrderSchema[]>([]);
    const lastOrder = orders.at(-1);

    const total =
    lastOrder?.details?.reduce(
        (acc, detail) => acc + Number(detail.subtotal),
        0
    ) ?? 0;

    useEffect(() => {
        const loadUserData = async () => {
          if (!user?.id) return;
    
          try {

            try {
              const ordersUser = await getOrdersByUserId(Number(user.id));
              setOrders(ordersUser || []);
            } catch (error) {
              setOrders([]);
            }
          } catch (error) {
            console.error("Error loading profile:", error);
          }
        };
    
        loadUserData();
      }, [user?.id]);

      
    
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6">

            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                Procede con el pago
                </h1>
                <h2>Pague mediante transferencia o diríjase a la sucursal a pagar en efectivo</h2>
            </div>

            <div className="font-semibold bg-gray-50 border border-gray-200 p-5 space-y-3">
                <div className="flex justify-between text-sm">
                    <span>CBU</span>
                    <span>
                        123456789
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span>Alias</span>
                    <span>
                        Cromo.puma
                    </span>
                </div>
            </div>

            <div className="border-t border-gray-200" />

            {lastOrder ? (
                <div className="flex justify-between items-center">
                <span className="text-lg font-medium">
                    Total a pagar
                </span>
                <span className="text-2xl font-semibold text-gray-900">
                    ${total.toLocaleString("es-AR")}
                </span>
                </div>
            ) : (
                <p className="text-center text-sm py-6">
                Error al cargar los datos de pago
                </p>
            )}

            <Link to="/">
                <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-200 shadow-sm">
                Volver a la página principal
                </button>
            </Link>
            </div>
        </section>
        );

}