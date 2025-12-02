import { adminRequest } from "../client"
import type { ShopifyReturn } from "../types"

const GET_RETURN_QUERY = `#graphql
query GetReturn($id: ID!) {
  return(id: $id) {
    name
    status
    totalQuantity
    id
    order {
      id
      currencyCode
      shippingAddress {
        countryCodeV2
      }
    }
    returnShippingFees {
      amountSet {
        presentmentMoney {
          currencyCode
          amount
        }
      }
    }
    returnLineItems(first: 10) {
      nodes {
        id
        quantity
        returnReasonNote
        returnReason
        ... on ReturnLineItem {
          restockingFee {
            percentage
          }
          totalWeight {
            unit
            value
          }
          fulfillmentLineItem {
            lineItem {
              name
              sku
              requiresShipping
              image {
                url
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
              variant {
                inventoryItem {
                  harmonizedSystemCode
                }
              }
            }
          }
        }
      }
    }
    refunds(first: 10) {
      nodes {
        totalRefundedSet {
          presentmentMoney {
            amount
          }
        }
      }
    }
    reverseFulfillmentOrders(first: 10) {
      nodes {
        id
        lineItems(first: 100) {
          nodes {
            totalQuantity
            id
          }
        }
        reverseDeliveries(first: 10) {
          nodes {
            deliverable {
              ... on ReverseDeliveryShippingDeliverable {
                label {
                  publicFileUrl
                }
                tracking {
                  number
                  carrierName
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export async function getReturn(id: string): Promise<ShopifyReturn> {
  const data = await adminRequest(GET_RETURN_QUERY, {
    id: `gid://shopify/Return/${id}`,
  })

  if (!data.return) {
    throw new Error("Return not found")
  }

  return data.return
}

