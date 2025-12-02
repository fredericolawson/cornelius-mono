import { adminRequest } from "../client";
import type { ValidateOrderQuery } from "../types/generated/admin.generated";

const VALIDATE_ORDER_QUERY = `#graphql
query ValidateOrder($search: String!) {
  orders(first: 1, query: $search) {
    nodes {
      id
      name
    }
  }
}
`;

export async function validateOrder({
  email,
  orderNumber,
}: {
  email: string;
  orderNumber: string;
}) {
  const search = `name:#${orderNumber} email:${email}`;
  const data = await adminRequest<ValidateOrderQuery>(VALIDATE_ORDER_QUERY, {
    search,
  });
  return data.orders.nodes;
}
