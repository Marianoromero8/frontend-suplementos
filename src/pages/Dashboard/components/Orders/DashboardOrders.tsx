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
import { useEffect, useState, useMemo } from "react";
import { Pagination } from "@/components/Pagination";
import type { OrderSchema } from "@/schemas/order.schema";
import { getOrders } from "@/services/orders.service";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

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
  const [pageSize, setPageSize] = useState(10)
  const [params, setParams] = useSearchParams()
  const totalAmount = params.get("total") ?? ""
  const status = params.get("status") ?? ""


  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const filteredOrders = useMemo(() => {
      return orders
        .filter((o) => {
          if(o.status === status) return true
        })
        .sort((a , b ) => {
          const aa = a.total ?? 0;
          const ba = b.total ?? 0;
          if (totalAmount === "desc") return Number(ba) - Number(aa);
          if (totalAmount === "asc") return Number(aa) - Number(ba);
          return 0;
        })
    }, [orders, totalAmount, status, totalAmount]);

  const ordersPagination = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

  const updateParam = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      value ? next.set(key, value) : next.delete(key);
      return next;
    });
  };


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
          onClick={() => {
            const next = totalAmount === "" ? "asc" : totalAmount === "asc" ? "desc" : "";
            updateParam("total", next);
          }}
          className="cursor-pointer border-2 w-25"
        >
          Total Amount
          {totalAmount === "asc" ? " ↑" : totalAmount === "desc" ? " ↓" : ""}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            const next = status === "" ? "pending" : status === "pending" ? "paid" : status === "cancelled" ? "cancelled" : "pending";
            updateParam("status", next);
          }}
          className="cursor-pointer border-2 w-25"
        >
          Status
          {status === "pending" ? " pending" : status === "paid" ? " paid" : status === "cancelled" ? " cancelled" : " pending"}
        </Button>

        <span className="">Show:</span>
        <Input className="w-30" type="number" placeholder="Ej: 10"
          onChange={(e) => {
            const v = e.target.value
            setPageSize(Number(v));
          }}
        />

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
