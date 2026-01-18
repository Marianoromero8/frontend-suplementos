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
import { useAuth } from "@/contexts/AuthContext";
import type { OrderSchema } from "@/schemas/order.schema";
import { getOrdersByUserId } from "@/services/user.service";
import { SquareUser } from "lucide-react";
import { useEffect, useState } from "react";

export default function Perfil() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderSchema[]>([]);

  useEffect(() => {
    getOrdersByUserId(Number(user?.id)).then(setOrders);
  }, []);

  const [edit, setEdit] = useState(false);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="flex text-5xl font-bold justify-center">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-center gap-2 font-bold">
            <SquareUser />
            Profile Data
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div>
            <label className="font-semibold">Name</label>
            {edit ? (
              <Input name="name" />
            ) : (
              <p className="opacity-80">{user?.name}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Email</label>
            {edit ? (
              <Input name="email" />
            ) : (
              <p className="opacity-80">{user?.email}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Role</label>
            <p className="opacity-80">{user?.role}</p>
          </div>

          {edit ? (
            <div className="flex flex-col gap-3">
              <Button className="w-full">Save Changes</Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Profile
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ORDERS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center font-bold">
            Orders
          </CardTitle>
          <CardContent>
            {orders.map((or) => (
              <div key={or.order_id} className="mb-6 space-y-2">
                {orders.length === 0 && (
                  <p className="text-center text-muted-foreground">
                    No tenés órdenes todavía.
                  </p>
                )}
                {/* Cabecera por orden */}
                <p className="font-semibold">Orden #{or.order_id}</p>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Detalle</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {or.details.map((detail) => (
                      <TableRow key={detail.order_detail_id}>
                        <TableCell>{detail.order_detail_id}</TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>${detail.subtotal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
