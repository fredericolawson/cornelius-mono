export type Order = {
  id: string
  name: string
  fullName: string
  firstName: string
  email: string
  createdAt: string
  shippedOn: string
  validUntil: Date
  statusPageUrl: string
  address: Address
  countryCode: string
  currencyCode: string
  orderItems: OrderItem[]
  returnableItems: OrderItem[]
  outboundTrackingNumber: string | null
  outboundTrackingCompany: string | null
  totalPrice: number
  taxRate: number
  exchangeRate: number
  shippingService: ShippingService
  customerId: string
  returnIds: string[]
  exclusions: OrderExclusions
}

export type OrderItem = {
  id: string
  name: string
  quantity: number
  originalQuantity: number
  sku: string
  image: string | null
  customAttributes: CustomAttribute[]
  requiresShipping: boolean
  value: number
  hsCode: string | null
  productType: string
  discountedTotal: number
  discountedTotalShopMoney: number
  taxAmount: number
  price: number
  shopPrice: number
  discount: number
  currencyCode: string
  returnReason?: string
  returnReasonNote?: string
}

export type ShippingService = {
  fee: number
  text: string
  explainer: string
}

export type OrderExclusions = {
  noReturn: boolean
  alteration: boolean
  allowReturn: boolean
  ignoreBlockers: boolean
}

export type CustomAttribute = {
  key: string
  value: string
}

export type Address = {
  firstName: string
  lastName: string
  address1: string
  address2?: string | null
  city: string
  province?: string | null
  zip: string
  countryCodeV2: string
  phone?: string | null
}

