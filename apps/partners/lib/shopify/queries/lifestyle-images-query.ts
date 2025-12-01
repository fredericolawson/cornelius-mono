export const LIFESTYLE_IMAGES_QUERY = `
query GetLifestyleImages {
  products(first: 250, query: "status:ACTIVE") {
    edges {
      node {
        id
        title
        handle
        productType
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 20) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        category: metafield(namespace: "custom", key: "category") {
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  displayName
                }
              }
            }
          }
        }
        variants(first: 1) {
          nodes {
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
    }
  }
}
`

