import type {
  GetProductsVariantsQuery,
  GetProductsVariantsQueryVariables,
} from "../types/generated/admin.generated";

export const GET_PRODUCTS_VARIANTS_QUERY = `#graphql
  query getProductsVariants(
    $nProducts: Int = 250
    $nVariants: Int = 250
    $country: CountryCode!
    $language: String!
  ) {
    products(first: $nProducts, query: "status:ACTIVE") {
      edges {
        node {
          id
          handle
          vendor
          title
          descriptionHtml
          translations(locale: $language) {
            key
            value
          }
          productType
          contextualPricing(context: {country: $country}) {
            maxVariantPricing {
              price {
                amount
                currencyCode
              }
            }
          }
          material: metafield(namespace: "custom", key: "material") {
            reference {
              ... on Metaobject {
                displayName,
                title: field(key: "title") {
                  value
                },
                group: field(key: "group") {
                  value
                }
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
          sizing: metafield(namespace: "custom", key: "sizing") {
            reference {
              ... on Metaobject {
                glove_length: field(key: "glove_length") {
                  value
                },
                size_group: field(key: "group") {
                  value
                }
              }
            }
          }
          variants(first: $nVariants) {
            edges {
              node {
                id
                title
                availableForSale
                sku
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                }
                translations(locale: $language) {
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type { GetProductsVariantsQuery, GetProductsVariantsQueryVariables };
