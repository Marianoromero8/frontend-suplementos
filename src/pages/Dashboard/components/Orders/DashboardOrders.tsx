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
import { getOrders, updateOrderStatus } from "@/services/orders.service";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { OrderPDF } from "./OrderPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Swal from "sweetalert2";

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
  if (status === "cancel")
    return (
      <div className="flex flex-row gap-2 font-bold">
        <X className="text-[#fa1818]" />
        Cancel
      </div>
    );
};

export function DashboardOrders() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderSchema[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [params, setParams] = useSearchParams();
  const totalAmount = params.get("total") ?? "";
  const status = params.get("status") ?? "";

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (orderId: number, currentStatus: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const { value: newStatus } = await Swal.fire({
      title: "Actualizar estado",
      input: "select",
      inputOptions: {
        pending: "Pending",
        paid: "Paid",
        cancel: "Cancel",
      },
      inputValue: currentStatus,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      confirmButtonColor: "#0b2deb",
    });

    if (newStatus && newStatus !== currentStatus) {
      try {
        Swal.showLoading();
        await updateOrderStatus(
          orderId,
          newStatus as "paid" | "pending" | "cancel",
          token,
        );

        setOrders((prev) =>
          prev.map((o) =>
            o.order_id === orderId ? { ...o, status: newStatus } : o,
          ),
        );

        Swal.fire(
          "¡Actualizado!",
          `La orden #${orderId} ahora está ${newStatus}`,
          "success",
        );
      } catch (error) {
        Swal.fire(
          "Error",
          "Una vez cancelada la orden, no se puede volver a editar",
          "error",
        );
      }
    }
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        if (status === "") return true;
        return o.status === status;
      })
      .sort((a, b) => {
        const aa = a.total ?? 0;
        const bb = b.total ?? 0;
        if (totalAmount === "desc") return Number(bb) - Number(aa);
        if (totalAmount === "asc") return Number(aa) - Number(bb);
        return 0;
      });
  }, [orders, status, totalAmount]);

  const ordersPagination = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const updateParam = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      value ? next.set(key, value) : next.delete(key);
      return next;
    });
  };

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
    if (page > maxPage) setPage(maxPage);
    if (page < 1) setPage(1);
  }, [filteredOrders.length, pageSize, page, setPage]);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Ordenes</h1>
        <p className="text-muted-foreground">Ordenes - Paid/Pending/Cancel</p>
      </div>
      <div className="flex items-center justify-start gap-2">
        <span className="">Ordenado por:</span>
        <Button
          variant="ghost"
          onClick={() => {
            const next =
              totalAmount === "" ? "asc" : totalAmount === "asc" ? "desc" : "";
            updateParam("total", next);
          }}
          className="cursor-pointer border-2 w-25"
        >
          Monto total
          {totalAmount === "asc" ? " ↑" : totalAmount === "desc" ? " ↓" : ""}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            const next =
              status === ""
                ? "pending"
                : status === "pending"
                  ? "paid"
                  : status === "paid"
                    ? "cancel"
                    : "";
            updateParam("status", next);
          }}
          className="cursor-pointer border-2 w-25"
        >
          Estado
          {status && ` ${status}`}
        </Button>

        <span className="">Mostrar:</span>
        <Input
          className="w-30"
          value={pageSize}
          type="number"
          placeholder="Ej: 10"
          min={1}
          max={filteredOrders.length}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < 1) {
              setPageSize(1);
            } else {
              setPageSize(Number(v));
            }
          }}
        />
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID orden</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Monto Total</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>PDF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersPagination.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell className="font-semibold">
                  {order.order_id}
                </TableCell>
                <TableCell>
                  {order.details.reduce((acc, item) => acc + item.quantity, 0)}
                </TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.order_date.slice(0, 10)}</TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      handleStatusChange(order.order_id, order.status)
                    }
                    className="hover:bg-[#f5f0f0] p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    {statusOrder(order.status)}
                  </button>
                </TableCell>
                <TableCell>
                  {order.status === "paid" ? (
                    <PDFDownloadLink
                      document={<OrderPDF order={order} />}
                      fileName={`orden_${order.order_id}.pdf`}
                    >
                      {({ loading }) => (
                        <Button variant="ghost" disabled={loading}>
                          {loading ? "..." : <File />}
                        </Button>
                      )}
                    </PDFDownloadLink>
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
        total={filteredOrders.length}
        onChange={setPage}
      />
    </div>
  );
}
