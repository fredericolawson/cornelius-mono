import type { ShopifyReturn } from "@workspace/shopify/types"
import type { Return, ReturnItem, ReturnDocs, ReverseFulfillmentOrderLineItem } from "@/types"

export function mapReturn(shopifyReturn: ShopifyReturn): Return {
  const items: ReturnItem[] = shopifyReturn.returnLineItems.nodes.map((item) => {
    const discountAmount = parseFloat(
      item.fulfillmentLineItem.lineItem.discountAllocations[0]?.allocatedAmountSet?.presentmentMoney?.amount || "0"
    )
    const discountAmountShop = parseFloat(
      item.fulfillmentLineItem.lineItem.discountAllocations[0]?.allocatedAmountSet?.shopMoney?.amount || "0"
    )

    return {
      id: item.id,
      sku: item.fulfillmentLineItem.lineItem.sku,
      quantity: item.quantity,
      returnReasonNote: item.returnReasonNote,
      returnReason: item.returnReason,
      name: item.fulfillmentLineItem.lineItem.name,
      image: item.fulfillmentLineItem.lineItem.image?.url || null,
      productType: item.fulfillmentLineItem.lineItem.product.productType,
      requiresShipping: item.fulfillmentLineItem.lineItem.requiresShipping,
      hsCode: item.fulfillmentLineItem.lineItem.variant?.inventoryItem?.harmonizedSystemCode || null,
      restockingFee: item.restockingFee?.percentage || 0,
      discountedTotal:
        parseFloat(item.fulfillmentLineItem.lineItem.originalTotalSet.presentmentMoney.amount) - discountAmount,
      discountedTotalShopMoney:
        parseFloat(item.fulfillmentLineItem.lineItem.originalTotalSet.shopMoney.amount) - discountAmountShop,
      totalWeight: item.totalWeight?.value || 0,
      totalWeightUnit: item.totalWeight?.unit || "GRAMS",
    }
  })

  const discountedTotal = items.reduce((sum, item) => sum + item.discountedTotal, 0)
  const amountRefunded = shopifyReturn.refunds.nodes.reduce(
    (sum, refund) => sum + parseFloat(refund.totalRefundedSet.presentmentMoney.amount),
    0
  )

  // Extract shipping fee
  const shippingFee = parseFloat(shopifyReturn.returnShippingFees[0]?.amountSet?.presentmentMoney?.amount || "0")
  const totalFee = shippingFee

  // Extract return docs from reverse fulfillment order
  let returnDocs: ReturnDocs | null = null
  const reverseFulfillmentOrder = shopifyReturn.reverseFulfillmentOrders.nodes[0]
  if (reverseFulfillmentOrder) {
    const reverseDelivery = reverseFulfillmentOrder.reverseDeliveries.nodes[0]
    if (reverseDelivery?.deliverable) {
      returnDocs = {
        label: reverseDelivery.deliverable.label?.publicFileUrl || null,
        tracking: reverseDelivery.deliverable.tracking?.url || null,
        number: reverseDelivery.deliverable.tracking?.number || null,
        carrier: reverseDelivery.deliverable.tracking?.carrierName || null,
      }
    }
  }

  const reverseFulfillmentOrderLineItems: ReverseFulfillmentOrderLineItem[] =
    reverseFulfillmentOrder?.lineItems?.nodes.map((item) => ({
      id: item.id,
      totalQuantity: item.totalQuantity,
    })) || []

  return {
    id: shopifyReturn.id.split("/").pop()!,
    name: shopifyReturn.name,
    orderId: shopifyReturn.order.id.split("/").pop()!,
    status: shopifyReturn.status as any,
    totalQuantity: shopifyReturn.totalQuantity,
    items,
    discountedTotal,
    totalFee,
    amountRefunded,
    reverseFulfillmentOrderId: reverseFulfillmentOrder?.id || "",
    reverseFulfillmentOrderLineItems,
    returnDocs,
    countryCode: shopifyReturn.order.shippingAddress.countryCodeV2,
  }
}

