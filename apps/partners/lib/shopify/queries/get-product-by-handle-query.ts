export const GET_PRODUCT_BY_HANDLE_QUERY = `
query GetProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
    status
    options(first: 1) {
      values
    }
    featuredImage {
      url
    }
    variants(first: 1) {
      edges {
        node {
          price
          gbpPrice: contextualPricing(context: { country: GB }) {
            price {
              amount
            }
          }
          usdPrice: contextualPricing(context: { country: US }) {
            price {
              amount
            }
          }
        }
      }
    }
    priceRangeV2 {
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
        }
      }
    }
  }
}
`

