import type { Customer, Order, Shipment, Data } from "@/lib/types";
import { Card } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";

export function CustomerData({ data }: { data: Data }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <CustomerDetails customer={data.customer} />
      <Orders orders={data.orders} />
      <Shipments shipments={data.shipments} />
    </div>
  );
}

function CustomerDetails({ customer }: { customer: Customer }) {
  return (
    <Link
      href={`https://admin.shopify.com/store/corneliajames/customers/${customer.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="hover:bg-gray-100 px-3 py-2">
        <div className="flex flex-col gap-2 text-normal">
          <div>{customer.name}</div>
          <div>{customer.email}</div>
        </div>
      </Card>
    </Link>
  );
}

function Orders({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2">
      <div>Orders</div>
      {orders.map((order) => (
        <Link
          key={order.recordId}
          href={order.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Card className="flex flex-col px-3 py-2 hover:bg-gray-100">
            <div className="flex flex-row w-full mb-2 justify-between items-center">
              <span className="w-1/3">{order.number}</span>
              <span className="w-1/3">{formatDate(order.date)}</span>
              <Status
                status={order.status}
                color={orderStatusColor(order.status)}
              />
            </div>
            <OrderVariants variants={order.variants} />
          </Card>
        </Link>
      ))}
    </div>
  );
}

function OrderVariants({ variants }: { variants: string[] }) {
  if (!variants || variants.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col text-sm text-muted-foreground">
      {variants.map((variant, index) => (
        <div key={index}>{variant}</div>
      ))}
    </div>
  );
}
function Shipments({ shipments }: { shipments: Shipment[] }) {
  if (shipments.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2">
      <div>Shipments</div>
      {shipments.map((shipment) => (
        <a
          key={shipment.recordId}
          href={shipment.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Card className="flex flex-col px-3 py-2 hover:bg-gray-100">
            <div className="mb-2">{shipment.reference}</div>
            <Status
              status={shipment.status}
              color={shipmentStatusColor(shipment.status)}
            />
          </Card>
        </a>
      ))}
    </div>
  );
}

function Status({ status, color }: { status: string; color: string }) {
  return (
    <Badge
      className={`py-1 w-[90px] justify-center font-semibold ${color} text-white border-transparent`}
    >
      {status}
    </Badge>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function orderStatusColor(status: string) {
  switch (status) {
    case "unfulfilled":
      return "bg-blue-600";
    case "fulfilled":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    case "hold":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}

function shipmentStatusColor(status: string) {
  switch (status) {
    case "draft":
      return "bg-blue-600";
    case "delivered":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    case "hold":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}
