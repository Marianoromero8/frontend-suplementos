import { mockOrders } from "@/data/orders.mock";
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
import { useState } from "react";
import { Pagination } from "@/components/Pagination";

const statusOrder = (status: string) => {
  if (status === "completed")
    return (
      <div className="flex flex-row gap-2 font-bold">
        <Check className="text-[#167c12]" />
        Completed
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
  const orders = mockOrders;
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const ordersPagination = orders.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Orders - Completed/Pending/Cancelled
        </p>
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
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{statusOrder(order.status)}</TableCell>
                <TableCell>
                  {order.status === "completed" ? (
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
