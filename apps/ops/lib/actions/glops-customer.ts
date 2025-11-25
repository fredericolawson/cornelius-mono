"use server";

import { mapCustomer, mapOrder, mapShipment } from "@/lib/utils/glops-map";
import { listRecords, base } from "@/lib/actions/airtable";

export async function getCustomerData(contact: { email?: string; phoneNumber?: string }) {
  let customerRecords;

  if (contact.email) {
    console.log("Searching by email:", contact.email);
    customerRecords = await base("Customers")
      .select({
        filterByFormula: `{Email | DEV} = '${contact.email.toLowerCase()}'`,
      })
      .all();
  } else if (contact.phoneNumber) {
    // Format phone: remove +, spaces, and special chars for Airtable integer field
    const formattedPhone = contact.phoneNumber.replace(/[\s\+\-\(\)]/g, '');
    console.log("Searching by phone:", contact.phoneNumber, "formatted:", formattedPhone);
    customerRecords = await base("Customers")
      .select({
        filterByFormula: `{Phone integer} = '${formattedPhone}'`,
      })
      .all();
  } else {
    throw new Error("Either email or phoneNumber must be provided");
  }

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
