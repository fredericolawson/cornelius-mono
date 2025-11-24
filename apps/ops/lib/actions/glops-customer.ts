"use server";

import { mapCustomer, mapOrder, mapShipment } from "@/lib/utils/glops-map";
import { listRecords, base } from "@/lib/actions/airtable";

export async function getCustomerData(email: string) {
  console.log("email", email);
  const customerRecords = await base("Customers")
    .select({
      filterByFormula: `{Email | DEV} = '${email.toLowerCase()}'`,
    })
    .all();

  if (customerRecords.length === 0) {
    return { customer: null, orders: [], shipments: [] };
  }

  const customer = mapCustomer(customerRecords[0]!);
  const orders = await listRecords(
    "Orders",
    customer.orders,
    "Order Number",
    mapOrder
  );

  const shipments = await listRecords(
    "Shipments",
    customer.shipments,
    "Key",
    mapShipment
  );

  return { customer, orders, shipments };
}
