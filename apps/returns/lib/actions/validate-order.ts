"use server";

import { validateOrder as validateOrderQuery } from "@workspace/shopify/queries/validate-order";
import { redirect } from "next/navigation";

export async function validateOrder(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const orderNumber = formData.get("orderNumber") as string;

  // Validate inputs
  if (!email || !orderNumber) {
    return { error: "Please fill in all fields" };
  }

  if (!/^\d{5}$/.test(orderNumber)) {
    return { error: "Order number must be 5 digits" };
  }

  const orders = await validateOrderQuery({ email, orderNumber });

  if (!orders || orders.length === 0) {
    return { error: "Order not found" };
  }

  const orderId = orders[0]?.id.split("/").pop();
  redirect(`/orders/${orderId}`);
}
