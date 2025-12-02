import { GraphQLClient } from "graphql-request";

export const shopifyClient = new GraphQLClient(
  `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/graphql.json`,
  {
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
    },
  }
);

export async function adminRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  return shopifyClient.request<T>(query, variables);
}
