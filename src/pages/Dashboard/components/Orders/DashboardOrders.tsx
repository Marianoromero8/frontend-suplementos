import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Check, Clock, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import type { OrderSchema } from "@/schemas/order.schema";
import { getOrders } from "@/services/orders.service";
import { Input } from "@/components/ui/input";

const statusOrder = (status: string) => {
  if (status === "paid")
    return (
      <div className="flex flex-row gap-2 font-bold">
        <Check className="text-[#167c12]" />
        Paid
      </div>
    );
  if (status === "pending")
    return (
      <div className="flex flex-row gap-2 font-bold">
        <Clock className="text-[#f57c0bee]" />
        Pending
      </div>
    );
  if (status === "cancelled")
    return (
      <div className="flex flex-row gap-2 font-bold">
        <X className="text-[#fa1818]" />
        Cancelled
      </div>
    );
};

export function DashboardOrders() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderSchema[]>([]);
  const pageSize = 10;

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const ordersPagination = orders.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Orders - Paid/Pending/Cancelled</p>
      </div>
      <div className="flex items-center justify-start gap-2">

        <span className="">Order by:</span>
        <Button
          variant="ghost"
          onClick={() => {}}
          className="cursor-pointer border-2 w-28"
        >
          Total Amount
        </Button>
        <Button
          variant="ghost"
          onClick={() => {}}
          className="cursor-pointer border-2 w-18"
        >
          Status
        </Button>

        <span className="">Show:</span>
        <Input className="w-30" type="number" placeholder="Ej: 10"/>

      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID order</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>PDF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersPagination.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell className="font-semibold">
                  {order.order_id}
                </TableCell>
                <TableCell>{order.details.length}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.order_date.slice(0, 10)}</TableCell>
                <TableCell>{statusOrder(order.status)}</TableCell>
                <TableCell>
                  {order.status === "paid" ? (
                    <Button variant="ghost">
                      <File />
                    </Button>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={orders.length}
        onChange={setPage}
      />
    </div>
  );
}
