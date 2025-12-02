import { adminRequest } from "../client"
import type { ShopifyOrder } from "../types"

const GET_ORDER_QUERY = `#graphql
query GetOrder($id: ID!) {
  order(id: $id) {
    id
    name
    statusPageUrl
    createdAt
    email
    tags
    currencyCode
    taxLines {
      rate
    }
    returns(first: 95, query: "NOT status:CANCELED") {
      nodes {
        id
      }
    }
    subtotalPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
      shopMoney {
        amount
      }
    }
    totalDiscountsSet {
      presentmentMoney {
        amount
      }
    }
    shippingAddress {
      name
      firstName
      lastName
      company
      address1
      address2
      city
      province
      provinceCode
      zip
      country
      countryCodeV2
      phone
    }
    customer {
      displayName
      id
      email
      phone
    }
    fulfillments(first: 10) {
      createdAt
      status
      trackingInfo {
        company
        number
      }
      fulfillmentLineItems(first: 30) {
        nodes {
          lineItem {
            name
            requiresShipping
            image {
              url
            }
            sku
            currentQuantity
            quantity
            customAttributes {
              key
              value
            }
            discountedUnitPriceAfterAllDiscountsSet {
              presentmentMoney {
                amount
              }
            }
            taxLines {
              rate
              priceSet {
                presentmentMoney {
                  amount
                }
              }
            }
            variant {
              inventoryItem {
                harmonizedSystemCode
              }
            }
            product {
              productType
            }
            originalTotalSet {
              presentmentMoney {
                amount
              }
              shopMoney {
                amount
              }
            }
            discountAllocations {
              allocatedAmountSet {
                presentmentMoney {
                  amount
                }
                shopMoney {
                  amount
                }
              }
            }
          }
          quantity
          id
          originalTotalSet {
            presentmentMoney {
              amount
              currencyCode
            }
            shopMoney {
              amount
            }
          }
          discountedTotalSet {
            presentmentMoney {
              amount
            }
            shopMoney {
              amount
            }
          }
        }
      }
    }
  }
}
`

export async function getOrder(id: string): Promise<ShopifyOrder> {
  const data = await adminRequest(GET_ORDER_QUERY, {
    id: `gid://shopify/Order/${id}`,
  })

  if (!data.order) {
    throw new Error("Order not found")
  }

  return data.order
}

