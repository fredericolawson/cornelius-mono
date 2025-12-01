export type LifestyleImage = {
  id: string
  url: string
  altText: string
  width: number
  height: number
  product: {
    id: string
    title: string
    handle: string
    productType: string
    category: string[]
    price: {
      amount: string
      currencyCode: string
    }
    prices?: {
      usd: string
      gbp: string
    }
  }
}

export type ShopifyImage = {
  url: string
  altText?: string
  width?: number
  height?: number
}

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  productType: string
  status: string
  tags: string[]
  onlineStoreUrl?: string
  featuredImage?: ShopifyImage
  priceRangeV2: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  prices?: {
    usd: string
    gbp: string
  }
  images: {
    edges: Array<{
      node: ShopifyImage
    }>
  }
  collections?: {
    nodes: Array<{
      title: string
    }>
  }
  variants?: {
    nodes: Array<{
      sku: string
      selectedOptions: Array<{
        name: string
        value: string
      }>
      image?: ShopifyImage
    }>
  }
}

export type ShopifyPage = {
  id: string
  title: string
  handle: string
  body: string
  bodySummary: string
  createdAt: string
  updatedAt: string
}
