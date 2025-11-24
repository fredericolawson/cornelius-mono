import type Airtable from "airtable";

export function mapCustomer(customer: Airtable.Record<any>) {
  return {
    recordId: customer.id,
    id: customer.fields.id,
    name: customer.fields.Name,
    email: customer.fields.Email,
    orders: customer.fields.Orders,
    shipments: customer.fields.Shipments,
  };
}

export function mapOrder(order: Airtable.Record<any>) {
  console.log("order", order);
  return {
    recordId: order.id,
    number: order.fields["Order Number"],
    status: order.fields["Status"],
    id: order.fields["Order ID"],
    date: order.fields["Order Date"],
    orderItems: order.fields["Order Items"],
    variants: order.fields["Variants"],
    link: order.fields["Glops Link"],
  };
}

export function mapShipment(shipment: Airtable.Record<any>) {
  return {
    recordId: shipment.id,
    reference: shipment.fields["Reference"],
    status: shipment.fields["Status"],
    link: shipment.fields["Shipment Link"],
  };
}
