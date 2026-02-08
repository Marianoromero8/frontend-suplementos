import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import type { User } from "@/schemas/user.schema";
import type { OrderSchema } from "@/schemas/order.schema";
import type { ProductSchema } from "@/schemas/product.schema";
import { getUsers } from "@/services/user.service";
import { getOrders } from "@/services/orders.service";
import { getProducts } from "@/services/product.service";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  total: {
    label: "Ventas",
    color: "#5D737E",
  },
} satisfies ChartConfig;

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export function DashboardHome() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<OrderSchema[]>([]);
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then(setUsers);
    getOrders().then(setOrders);
    getProducts().then(setProducts);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const completedOrders = orders.filter((o) => o.status === "paid");
  const usersLength = users.length;
  const ordersLength = completedOrders.length;
  const productsLength = products.length;
  const totalRevenue = completedOrders.reduce(
    (acc, o) => acc + Number(o.total),
    0,
  );

  const chartData = months.map((month, index) => {
    const monthlyTotal = completedOrders
      .filter((o) => new Date(o.order_date).getMonth() === index)
      .reduce((sum, o) => sum + Number(o.total), 0);

    return { month, total: monthlyTotal };
  });

  const latestOrders = completedOrders
    .sort(
      (a, b) =>
        new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
    )
    .slice(0, 5);

  const findUser = (id: number) =>
    users.find((u) => u.user_id === id)?.name ?? "Unknow";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Bienvenido, {user?.name ?? "Administrador"}
          </p>
        </div>

        <Button
          onClick={handleLogout}
          className="cursor-pointer"
          variant="outline"
        >
          Cerrar Sesion
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{usersLength}</p>
            <p className="text-muted-foreground text-sm">
              Usuarios Registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{productsLength}</p>
            <p className="text-muted-foreground text-sm">
              Productos en el Catálogo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ordenes Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{ordersLength}</p>
            <p className="text-muted-foreground text-sm">Ordenes Completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Recaudado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalRevenue}</p>
            <p className="text-muted-foreground text-sm">
              En Base a Ordenes Completadas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeOpacity={0.2} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  fontSize={12}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar dataKey="total" fill="var(--color-total)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ultimas Ordenes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestOrders.map((o) => (
                  <TableRow key={o.order_id}>
                    <TableCell className="font-semibold">
                      {findUser(o.user_id)}
                    </TableCell>
                    <TableCell>{o.order_date.slice(0, 10)}</TableCell>
                    <TableCell className="text-right font-bold">
                      ${o.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
