"use server";
import { shopifyClient } from "@/lib/shopify-client";
import {
  createBulkInventoryCostUpdate,
  UPDATE_INVENTORY_ITEM_COST,
  UPDATE_VARIANT_PRICE,
  PRICE_LIST_FIXED_PRICES_ADD,
} from "@/lib/graphql/mutations";
import {
  GET_PRODUCT_VARIANTS,
  GET_UK_MARKET_CATALOG,
} from "@/lib/graphql/queries";
import { revalidatePath } from "next/cache";

export async function updatePrice({
  productId,
  price,
}: {
  productId: string;
  price: string;
}) {
  const variants = await getVariants(productId);
  const variantsUpdate = variants.map((variant: any) => ({
    id: variant.id,
    price: price,
  }));

  const data = await shopifyClient.request(UPDATE_VARIANT_PRICE, {
    productId: `gid://shopify/Product/${productId}`,
    variants: variantsUpdate,
  });
  revalidatePath("/");

  const { productVariants, userErrors } = (data as any)
    .productVariantsBulkUpdate;

  return { productVariants, userErrors };
}

// ------------------------------------------------------------

export async function updatePriceGbp({
  productId,
  price,
}: {
  productId: string;
  price: string;
}) {
  const catalogData = await shopifyClient.request(GET_UK_MARKET_CATALOG);
  const catalogs = (catalogData as any).catalogs.nodes;

  const ukCatalog = catalogs.find(
    (catalog: any) => catalog.title === "United Kingdom"
  );

  if (!ukCatalog || !ukCatalog.priceList) {
    throw new Error("UK market catalog or price list not found");
  }

  const priceListId = ukCatalog.priceList.id;

  // Get product variants
  const variants = await getVariants(productId);

  // Build the prices array for the mutation
  const prices = variants.map((variant: any) => ({
    variantId: variant.id,
    price: {
      amount: price,
      currencyCode: "GBP",
    },
  }));

  // Update fixed prices on the price list
  const data = await shopifyClient.request(PRICE_LIST_FIXED_PRICES_ADD, {
    priceListId,
    prices,
  });

  revalidatePath("/");

  const { prices: updatedPrices, userErrors } = (data as any)
    .priceListFixedPricesAdd;

  return { productVariants: updatedPrices, userErrors };
}

// ------------------------------------------------------------

export async function updateCost({
  productId,
  cost,
}: {
  productId: string;
  cost: string;
}) {
  console.log("updateCost", productId, cost);
  const variants = await getVariants(productId);
  const inventoryItems = variants.map((variant: any) => ({
    id: variant.inventoryItem.id,
    cost: cost,
  }));

  const data = await shopifyClient.request(
    createBulkInventoryCostUpdate(inventoryItems)
  );
  revalidatePath("/");

  // Handle the aliased response structure (item1, item2, etc.)
  const results = Object.values(data as any);
  const inventoryItemUpdates = results
    .map((result: any) => result.inventoryItem)
    .filter(Boolean);
  const allUserErrors = results.flatMap(
    (result: any) => result.userErrors || []
  );

  return {
    inventoryItemUpdates,
    userErrors: allUserErrors,
  };
}

// ------------------------------------------------------------

async function getVariants(productId: string) {
  const getVariants = await shopifyClient.request(GET_PRODUCT_VARIANTS, {
    productId: `gid://shopify/Product/${productId}`,
  });

  const variants = (getVariants as any).product.variants.edges.map(
    (edge: any) => edge.node
  );
  return variants;
}
