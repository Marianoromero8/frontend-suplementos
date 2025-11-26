import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { mockCategories } from "@/data/categories.mock";
import { mockOrders } from "@/data/orders.mock";
import { mockProducts } from "@/data/products.mock";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Colores para categorías
const COLORS = ["#5D737E", "#02111B", "#30292F", "#FCFCFC", "#A3A3A3"];

export function DashboardReports() {
  const productSalesMap = new Map<number, number>();

  mockOrders.forEach((order) => {
    order.details.forEach((item) => {
      productSalesMap.set(
        item.product_id,
        (productSalesMap.get(item.product_id) || 0) + item.quantity
      );
    });
  });

  const productSales = Array.from(productSalesMap.entries())
    .map(([productId, qty]) => {
      const prod = mockProducts.find((p) => p.product_id === productId);
      return {
        name: prod?.name || "Unknown",
        qty,
      };
    })
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  const categorySalesMap = new Map<number, number>();

  mockOrders.forEach((order) => {
    order.details.forEach((item) => {
      const prod = mockProducts.find((p) => p.product_id === item.product_id);
      if (!prod) return;

      const prev = categorySalesMap.get(prod.category_id) || 0;
      categorySalesMap.set(prod.category_id, prev + item.quantity);
    });
  });

  const categoriesData = Array.from(categorySalesMap.entries()).map(
    ([categoryId, qty]) => {
      const category = mockCategories.find((c) => c.category_id === categoryId);

      return {
        name: category ? category.name : `Categoría ${categoryId}`,
        value: qty,
      };
    }
  );

  const stock = mockProducts.filter((p) => p.stock < 15);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Reports</h1>
      <p className="text-muted-foreground">Análisis e-commerce</p>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Productos Mas Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productSales} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="qty" fill="#5D737E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <ResponsiveContainer width="90%" height={250}>
                <PieChart>
                  <Pie
                    data={categoriesData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {categoriesData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos con Stock Bajo</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.map((prod) => (
                <TableRow key={prod.product_id}>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell className="font-bold text-[#f11404f3]">
                    {prod.stock}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
