export type Return = {
  id: string
  name: string
  orderId: string
  status: ReturnStatus
  totalQuantity: number
  items: ReturnItem[]
  discountedTotal: number
  totalFee: number
  amountRefunded: number
  reverseFulfillmentOrderId: string
  reverseFulfillmentOrderLineItems: ReverseFulfillmentOrderLineItem[]
  returnDocs: ReturnDocs | null
  countryCode: string
}

export type ReturnItem = {
  id: string
  sku: string
  quantity: number
  returnReasonNote: string
  returnReason: string
  name: string
  image: string | null
  productType: string
  requiresShipping: boolean
  hsCode: string | null
  restockingFee: number
  discountedTotal: number
  discountedTotalShopMoney: number
  totalWeight: number
  totalWeightUnit: string
}

export type ReturnStatus = "Open" | "In Progress" | "Complete" | "Cancelled"

export type ReturnDocs = {
  label: string | null
  tracking: string | null
  number: string | null
  carrier: string | null
}

export type ReverseFulfillmentOrderLineItem = {
  id: string
  totalQuantity: number
}

export type ReturnLineItemInput = {
  fulfillmentLineItemId: string
  quantity: number
  returnReason: string
  returnReasonNote: string
}

export type CreateReturnParams = {
  orderId: string
  shippingFee: number
  lineItems: ReturnLineItemInput[]
  currency: string
  returnType: "Credit" | "Refund"
  order: Order
  storeCreditAmount: number
}

export type ReturnType = "Credit" | "Refund"

import type { Order } from "./order"

