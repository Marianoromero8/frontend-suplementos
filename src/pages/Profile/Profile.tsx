import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import type { OrderSchema } from "@/schemas/order.schema";
import {
  editUser,
  getOrdersByUserId,
  getUserById,
} from "@/services/user.service";
import { Check, Clock, SquareUser, X } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Perfil() {
  const { user } = useAuth(); // Obtenemos el usuario logueado
  const [orders, setOrders] = useState<OrderSchema[]>([]);
  const [edit, setEdit] = useState(false);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.id) return;

      try {
        const userById = await getUserById(Number(user.id));

        setFormData({
          name: userById.name || "",
          email: userById.email || "",
          address: userById.address || "",
          password: "",
        });

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

  const handleSave = async () => {
    if (!formData.password || formData.password.length < 6) {
      return Swal.fire("Attention!", "Require password", "warning");
    }

    if (formData.address.length < 5) {
      return Swal.fire(
        "Attention",
        "Address must have at least 5 characters",
        "warning",
      );
    }

    const result = await Swal.fire({
      title: "¿Save Changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await editUser(Number(user?.id), formData);

        setEdit(false);
        await Swal.fire(
          "¡Éxito!",
          "Perfil actualizado correctamente",
          "success",
        );

        window.location.reload();
      } catch (error: any) {
        Swal.fire("Error", error.message || "No se pudo actualizar", "error");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="flex text-5xl font-bold justify-center">Perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-center gap-2 font-bold">
            <SquareUser />
            Informacion Pefil
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div>
            <label className="font-semibold">Nombre</label>
            {edit ? (
              <Input
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <p className="opacity-80">{formData?.name}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Email</label>
            {edit ? (
              <Input
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            ) : (
              <p className="opacity-80">{formData?.email}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Direccion</label>
            {edit ? (
              <Input
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            ) : (
              <p className="opacity-80">{formData?.address}</p>
            )}
          </div>

          {edit && (
            <div>
              <label className="font-semibold flex items-center gap-2">
                Confirmar Contraseña
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your current or new password"
                className="bg-white"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <label className="font-semibold">Rol</label>
            <p className="opacity-80">{user?.role}</p>
          </div>

          {edit ? (
            <div className="flex flex-col gap-3">
              <Button className="w-full" onClick={handleSave}>
                Guardar Cambios
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                setEdit(true);
              }}
            >
              Editar Perfil
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center font-bold">
            Ordenes
          </CardTitle>
          <CardContent>
            {orders.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {orders.map((or) => (
                  <AccordionItem key={or.order_id} value={`${or.order_id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-row justify-between w-full pr-4">
                        <p className="font-semibold flex flex-row gap-2">
                          Orden #{or.order_id}
                        </p>
                        <div className="flex flex-row items-center justify-start min-w-[110px] gap-2">
                          {or.status === "pending" ? (
                            <p className="font-semibold flex flex-row gap-2 items-center">
                              <Clock size={18} className="text-[#ee7c0a44]" />{" "}
                              {or.status}
                            </p>
                          ) : or.status === "paid" ? (
                            <p className="font-semibold flex flex-row gap-2 items-center">
                              <Check size={18} className="text-[#28e71799]" />{" "}
                              {or.status}
                            </p>
                          ) : or.status === "cancel" ? (
                            <p className="font-semibold flex flex-row gap-2 items-center">
                              <X size={18} className="text-[#e61a1a]" />{" "}
                              {or.status}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID Detalle</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Subtotal</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {or.details?.map((detail) => (
                            <TableRow key={detail.order_detail_id}>
                              <TableCell>{detail.order_detail_id}</TableCell>
                              <TableCell>{detail.quantity}</TableCell>
                              <TableCell>${detail.subtotal}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No tenés órdenes registradas todavía.
              </p>
            )}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
