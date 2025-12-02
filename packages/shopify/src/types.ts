export type ShopifyOrder = {
  id: string
  name: string
  statusPageUrl: string
  createdAt: string
  email: string
  tags: string[]
  currencyCode: string
  taxLines: Array<{ rate: number }>
  returns: {
    nodes: Array<{ id: string }>
  }
  subtotalPriceSet: {
    presentmentMoney: {
      amount: string
      currencyCode: string
    }
    shopMoney: {
      amount: string
    }
  }
  totalDiscountsSet: {
    presentmentMoney: {
      amount: string
    }
  }
  shippingAddress: {
    name: string
    firstName: string
    lastName: string
    company: string | null
    address1: string
    address2: string | null
    city: string
    province: string | null
    provinceCode: string | null
    zip: string
    country: string
    countryCodeV2: string
    phone: string | null
  }
  customer: {
    displayName: string
    id: string
    email: string
    phone: string | null
  }
  fulfillments: Array<{
    createdAt: string
    status: string
    trackingInfo: Array<{
      company: string | null
      number: string | null
    }>
    fulfillmentLineItems: {
      nodes: Array<FulfillmentLineItem>
    }
  }>
}

export type FulfillmentLineItem = {
  id: string
  quantity: number
  originalTotalSet: {
    presentmentMoney: {
      amount: string
      currencyCode: string
    }
    shopMoney: {
      amount: string
    }
  }
  discountedTotalSet: {
    presentmentMoney: {
      amount: string
    }
    shopMoney: {
      amount: string
    }
  }
  lineItem: {
    name: string
    requiresShipping: boolean
    image: {
      url: string
    } | null
    sku: string
    currentQuantity: number
    quantity: number
    customAttributes: Array<{
      key: string
      value: string
    }>
    discountedUnitPriceAfterAllDiscountsSet: {
      presentmentMoney: {
        amount: string
      }
    }
    taxLines: Array<{
      rate: number
      priceSet: {
        presentmentMoney: {
          amount: string
        }
      }
    }>
    variant: {
      inventoryItem: {
        harmonizedSystemCode: string | null
      }
    } | null
    product: {
      productType: string
    }
    originalTotalSet: {
      presentmentMoney: {
        amount: string
      }
      shopMoney: {
        amount: string
      }
    }
    discountAllocations: Array<{
      allocatedAmountSet: {
        presentmentMoney: {
          amount: string
        }
        shopMoney: {
          amount: string
        }
      }
    }>
  }
}

export type ShopifyReturn = {
  id: string
  name: string
  status: string
  totalQuantity: number
  order: {
    id: string
    currencyCode: string
    shippingAddress: {
      countryCodeV2: string
    }
  }
  returnShippingFees: Array<{
    amountSet: {
      presentmentMoney: {
        currencyCode: string
        amount: string
      }
    }
  }>
  returnLineItems: {
    nodes: Array<ReturnLineItem>
  }
  refunds: {
    nodes: Array<{
      totalRefundedSet: {
        presentmentMoney: {
          amount: string
        }
      }
    }>
  }
  reverseFulfillmentOrders: {
    nodes: Array<{
      id: string
      lineItems: {
        nodes: Array<{
          totalQuantity: number
          id: string
        }>
      }
      reverseDeliveries: {
        nodes: Array<{
          deliverable: {
            label: {
              publicFileUrl: string
            } | null
            tracking: {
              number: string
              carrierName: string
              url: string
            } | null
          } | null
        }>
      }
    }>
  }
}

export type ReturnLineItem = {
  id: string
  quantity: number
  returnReasonNote: string
  returnReason: string
  restockingFee: {
    percentage: number
  } | null
  totalWeight: {
    unit: string
    value: number
  } | null
  fulfillmentLineItem: {
    lineItem: {
      name: string
      sku: string
      requiresShipping: boolean
      image: {
        url: string
      } | null
      product: {
        productType: string
      }
      originalTotalSet: {
        presentmentMoney: {
          amount: string
        }
        shopMoney: {
          amount: string
        }
      }
      discountAllocations: Array<{
        allocatedAmountSet: {
          presentmentMoney: {
            amount: string
          }
          shopMoney: {
            amount: string
          }
        }
      }>
      variant: {
        inventoryItem: {
          harmonizedSystemCode: string | null
        }
      } | null
    }
  }
}

export type ReturnInput = {
  orderId: string
  returnShippingFee: {
    amount: {
      amount: number
      currencyCode: string
    }
  }
  returnLineItems: Array<{
    fulfillmentLineItemId: string
    quantity: number
    returnReason: string
    returnReasonNote: string
  }>
  notifyCustomer: boolean
}

export type DeliveryInput = {
  labelInput: {
    fileUrl: string
  }
  notifyCustomer: boolean
  reverseDeliveryLineItems: Array<{
    quantity: number
    reverseFulfillmentOrderLineItemId: string
  }>
  reverseFulfillmentOrderId: string
  trackingInput: {
    number: string
    url: string
  }
}

export type StoreCreditInput = {
  id: string
  creditInput: {
    creditAmount: {
      amount: number
      currencyCode: string
    }
  }
}

