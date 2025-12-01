import { createAdminApiClient } from "@shopify/admin-api-client"
import type { LifestyleImage, ShopifyProduct } from "../../types/types.js"

import { PRODUCTS_QUERY } from "./queries/products-query"
import { GET_PRODUCT_BY_HANDLE_QUERY } from "./queries/get-product-by-handle-query"
import { GET_PRODUCTS_HANDLES_QUERY } from "./queries/get-products-handles-query"
import { LIFESTYLE_IMAGES_QUERY } from "./queries/lifestyle-images-query"

let client: ReturnType<typeof createAdminApiClient> | null = null

function getClient() {
  if (!client) {
    const storeName = process.env.SHOPIFY_STORE_NAME
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN

    if (!storeName || !accessToken) {
      throw new Error("Missing Shopify credentials")
    }

    client = createAdminApiClient({
      storeDomain: storeName,
      accessToken: accessToken,
      apiVersion: "2025-10",
    })
  }
  return client
}

async function adminRequest(query: string, variables: Record<string, unknown> = {}) {
  const { data, errors } = await getClient().request(query, { variables })
  if (errors) throw new Error(`GraphQL error: ${JSON.stringify(errors)}`)
  return data
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await adminRequest(PRODUCTS_QUERY)
  return data.products.edges
    .map((edge: { node: any }) => {
      const product = edge.node
      const firstVariant = product.variants?.nodes?.[0]

      return {
        ...product,
        prices: firstVariant
          ? {
              usd: firstVariant.usdPrice?.price?.amount || product.priceRangeV2.maxVariantPrice.amount,
              gbp: firstVariant.gbpPrice?.price?.amount || product.priceRangeV2.maxVariantPrice.amount,
            }
          : undefined,
      }
    })
    .filter((product: ShopifyProduct) => (product.collections?.nodes?.length ?? 0) > 0)
}

export async function getProductByHandle(handle: string) {
  return await adminRequest(GET_PRODUCT_BY_HANDLE_QUERY, { handle })
}

export async function getProductsHandles() {
  return await adminRequest(GET_PRODUCTS_HANDLES_QUERY)
}

export async function getLifestyleImages(): Promise<LifestyleImage[]> {
  const data = await adminRequest(LIFESTYLE_IMAGES_QUERY)
  const lifestyleImages: LifestyleImage[] = []

  data.products.edges.forEach((productEdge: any) => {
    const product = productEdge.node
    product.images.edges.forEach((imageEdge: any) => {
      const image = imageEdge.node
      if (image.altText?.toLowerCase().includes("lifestyle")) {
        const categories = product.category?.references?.edges?.map((edge: any) => edge.node.displayName) || []
        const firstVariant = product.variants?.nodes?.[0]

        lifestyleImages.push({
          id: image.id,
          url: image.url,
          altText: image.altText,
          width: image.width,
          height: image.height,
          product: {
            id: product.id,
            title: product.title,
            handle: product.handle,
            productType: product.productType || "",
            category: categories,
            price: product.priceRangeV2.minVariantPrice,
            prices: firstVariant
              ? {
                  usd: firstVariant.usdPrice?.price?.amount || product.priceRangeV2.minVariantPrice.amount,
                  gbp: firstVariant.gbpPrice?.price?.amount || product.priceRangeV2.minVariantPrice.amount,
                }
              : undefined,
          },
        })
      }
    })
  })

  return lifestyleImages
}

export async function getProductsWithPrices(): Promise<ShopifyProduct[]> {
  return await getProducts()
}

export async function getProductByHandleWithPrices(handle: string) {
  const data = await getProductByHandle(handle)

  if (data.productByHandle) {
    const firstVariant = data.productByHandle.variants?.edges?.[0]?.node
    data.productByHandle.prices = firstVariant
      ? {
          usd: firstVariant.usdPrice?.price?.amount || data.productByHandle.priceRangeV2.maxVariantPrice.amount,
          gbp: firstVariant.gbpPrice?.price?.amount || data.productByHandle.priceRangeV2.maxVariantPrice.amount,
        }
      : undefined
  }

  return data
}

export async function getLifestyleImagesWithPrices(): Promise<LifestyleImage[]> {
  return await getLifestyleImages()
}
