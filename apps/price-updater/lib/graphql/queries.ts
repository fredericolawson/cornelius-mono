import gql from "graphql-tag";

export const GET_PRODUCT_VARIANTS = gql`
  query getProductVariants($productId: ID!) {
    product(id: $productId) {
      variants(first: 250) {
        edges {
          node {
            id
            inventoryItem {
              id
            }
          }
        }
      }
    }
  }
`;

export const GET_UK_MARKET_CATALOG = gql`
  query getUkMarketCatalog {
    catalogs(first: 200, type: MARKET) {
      nodes {
        id
        title
        status
        priceList {
          id
          currency
        }
        ... on MarketCatalog {
          markets(first: 10) {
            nodes {
              id
              name
              primary
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($query: String) {
    products(first: 250, sortKey: PRODUCT_TYPE, query: $query) {
      edges {
        node {
          id
          title
          productType
          contextualPricing(context: { country: US }) {
            maxVariantPricing {
              price {
                amount
                currencyCode
              }
            }
          }
          contextualPricingGbp: contextualPricing(context: { country: GB }) {
            maxVariantPricing {
              price {
                amount
                currencyCode
              }
            }
          }
          featuredMedia {
            preview {
              image {
                url
              }
            }
          }
          variants(first: 1) {
            nodes {
              id
              title
              inventoryItem {
                unitCost {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
