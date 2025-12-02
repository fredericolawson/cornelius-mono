import type { ShopifyOrder } from "@workspace/shopify/types"
import type { Order, OrderItem, ShippingService, OrderExclusions } from "@/types"

function mapShippingService(countryCode: string, exchangeRate: number): ShippingService {
  const domesticFee = parseFloat(process.env.DOMESTIC_SHIPPING_FEE || "8.00")
  const internationalFee = parseFloat(process.env.INTERNATIONAL_SHIPPING_FEE || "15.00")

  const domesticFeeLocal = domesticFee * exchangeRate
  const internationalFeeLocal = internationalFee * exchangeRate

  if (countryCode === "GB") {
    return {
      fee: domesticFeeLocal,
      text: "Domestic Return Shipping",
      explainer:
        "When you confirm your return you'll get a link to Royal Mail QR code which can be used in any post office",
    }
  } else {
    return {
      fee: internationalFeeLocal,
      text: "International Return Shipping",
      explainer: "A label will be provided with a local shipping service",
    }
  }
}

function mapValidUntil(createdAt: string): Date {
  const validUntil = new Date(createdAt)
  validUntil.setDate(validUntil.getDate() + 63)
  return validUntil
}

function mapExclusions(orderTags: string[]): OrderExclusions {
  return {
    noReturn: orderTags.includes("no_return"),
    alteration: orderTags.includes("alteration"),
    allowReturn: orderTags.includes("allow_return"),
    ignoreBlockers: orderTags.includes("ignore_blockers"),
  }
}

export function mapOrder(shopifyOrder: ShopifyOrder): Order {
  const fulfilledItems = shopifyOrder.fulfillments
    .filter((fulfillment) => fulfillment.status !== "CANCELLED")
    .flatMap((fulfillment) => fulfillment.fulfillmentLineItems.nodes)

  const orderItems: OrderItem[] = fulfilledItems.map((item) => {
    const discountAmount = parseFloat(item.lineItem.discountAllocations[0]?.allocatedAmountSet?.presentmentMoney?.amount || "0")
    const discountAmountShop = parseFloat(item.lineItem.discountAllocations[0]?.allocatedAmountSet?.shopMoney?.amount || "0")

    return {
      id: item.id,
      name: item.lineItem.name,
      quantity: item.lineItem.currentQuantity,
      originalQuantity: item.lineItem.quantity,
      sku: item.lineItem.sku,
      image: item.lineItem.image?.url || null,
      customAttributes: item.lineItem.customAttributes,
      requiresShipping: item.lineItem.requiresShipping,
      value: parseFloat(item.lineItem.discountedUnitPriceAfterAllDiscountsSet.presentmentMoney.amount),
      hsCode: item.lineItem.variant?.inventoryItem?.harmonizedSystemCode || null,
      productType: item.lineItem.product.productType,
      discountedTotal: parseFloat(item.lineItem.originalTotalSet.presentmentMoney.amount) - discountAmount,
      discountedTotalShopMoney: parseFloat(item.lineItem.originalTotalSet.shopMoney.amount) - discountAmountShop,
      taxAmount: parseFloat(item.lineItem.taxLines[0]?.priceSet.presentmentMoney.amount || "0"),
      price: parseFloat(item.originalTotalSet.presentmentMoney.amount),
      shopPrice: parseFloat(item.originalTotalSet.shopMoney.amount),
      discount: parseFloat(item.discountedTotalSet.presentmentMoney.amount),
      currencyCode: item.originalTotalSet.presentmentMoney.currencyCode,
    }
  })

  const returnableItems = orderItems.filter((item) => item.quantity > 0)
  const exchangeRate =
    parseFloat(shopifyOrder.subtotalPriceSet.presentmentMoney.amount) /
    parseFloat(shopifyOrder.subtotalPriceSet.shopMoney.amount)
  const currencyCode = shopifyOrder.subtotalPriceSet.presentmentMoney.currencyCode

  return {
    id: shopifyOrder.id.split("/").pop()!,
    fullName: `${shopifyOrder.shippingAddress.firstName} ${shopifyOrder.shippingAddress.lastName}`,
    firstName: shopifyOrder.shippingAddress.firstName,
    name: shopifyOrder.name,
    email: shopifyOrder.email,
    createdAt: shopifyOrder.createdAt,
    shippedOn: shopifyOrder.fulfillments[0]?.createdAt || shopifyOrder.createdAt,
    validUntil: mapValidUntil(shopifyOrder.createdAt),
    statusPageUrl: shopifyOrder.statusPageUrl,
    address: shopifyOrder.shippingAddress,
    countryCode: shopifyOrder.shippingAddress.countryCodeV2,
    currencyCode,
    orderItems,
    returnableItems,
    outboundTrackingNumber: shopifyOrder.fulfillments[0]?.trackingInfo[0]?.number || null,
    outboundTrackingCompany: shopifyOrder.fulfillments[0]?.trackingInfo[0]?.company || null,
    totalPrice: parseFloat(shopifyOrder.subtotalPriceSet.presentmentMoney.amount),
    taxRate: parseFloat(shopifyOrder.taxLines[0]?.rate.toString() || "0"),
    exchangeRate,
    shippingService: mapShippingService(shopifyOrder.shippingAddress.countryCodeV2, exchangeRate),
    customerId: shopifyOrder.customer.id.split("/").pop()!,
    returnIds: shopifyOrder.returns.nodes.map((returnData) => returnData.id.split("/").pop()!),
    exclusions: mapExclusions(shopifyOrder.tags),
  }
}

