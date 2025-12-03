import { GraphQLClient } from "graphql-request";
import { GET_PRODUCTS_VARIANTS_QUERY } from "./queries/get-products-variants";

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

export async function getProductsVariants({
  language,
  country,
}: {
  language: string;
  country: string;
}) {
  return adminRequest(GET_PRODUCTS_VARIANTS_QUERY, {
    language,
    country,
  });
}
