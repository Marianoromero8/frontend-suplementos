// components/OrderPDF.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { OrderSchema } from "@/schemas/order.schema";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 5,
  },
  label: { fontWeight: "bold" },
});

export const OrderPDF = ({ order }: { order: OrderSchema }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Comprobante de Orden</Text>

      <View style={styles.section}>
        <Text>ID de Orden: {order.order_id}</Text>
        <Text>Fecha: {order.order_date.slice(0, 10)}</Text>
        <Text>Estado: {order.status.toUpperCase()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
          Detalles de la compra:
        </Text>
        {order.details.map((item: any, index: number) => (
          <View key={index} style={styles.row}>
            <Text>Producto ID: {item.product_id}</Text>
            <Text>Cantidad: {item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 20, textAlign: "right" }}>
        <Text style={{ fontSize: 16 }}>Total Pagado: ${order.total}</Text>
      </View>
    </Page>
  </Document>
);
