import type { Order } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { formatDate } from "@workspace/ui/lib/date";

export function OrderSummary({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order {order.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>
          <span className="font-semibold">Customer:</span> {order.fullName}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {order.email}
        </div>
        <div>
          <span className="font-semibold">Order Date:</span>{" "}
          {formatDate({ date: order.createdAt, format: "short" })}
        </div>
        <div>
          <span className="font-semibold">Shipped:</span>{" "}
          {formatDate({ date: order.shippedOn, format: "short" })}
        </div>
      </CardContent>
    </Card>
  );
}
