import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockOrders } from "@/data/orders.mock";
import { mockProducts } from "@/data/products.mock";
import { mockUsers } from "@/data/users.mock";
import { Separator } from "@radix-ui/react-select";

export function DashboardHome() {
  const completedOrders = mockOrders.filter((o) => o.status === "completed");
  const users = mockUsers.length;
  const orders = completedOrders.length;
  const products = mockProducts.length;
  const totalRevenue = completedOrders.reduce((acc, o) => acc + o.total, 0);

  // Grafico Ventas Mensuales
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
  const salesByMonth = new Array(12).fill(0);

  mockOrders.forEach((o) => {
    const m = new Date(o.order_date).getMonth();
    salesByMonth[m] += o.total;
  });

  const maxValue = Math.max(...salesByMonth, 1);

  const latestOrders = completedOrders
    .sort(
      (a, b) =>
        new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
    )
    .slice(0, 5);

  const findUser = (id: number) =>
    mockUsers.find((u) => u.id === id)?.name ?? "Unknow";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <Separator />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users}</p>
            <p className="text-muted-foreground text-sm">
              Usuarios registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{products}</p>
            <p className="text-muted-foreground text-sm">
              Productos en catálogo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Órdenes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{orders}</p>
            <p className="text-muted-foreground text-sm">Pedidos realizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalRevenue}</p>
            <p className="text-muted-foreground text-sm">
              Basado en órdenes completadas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ventas mensuales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-2 h-48">
              {salesByMonth.map((value, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-[#5D737E] rounded-t-md"
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                    }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {months[i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas órdenes</CardTitle>
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
                    <TableCell>{o.order_date}</TableCell>
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
