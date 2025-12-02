import type { Order, OrderItem } from "@/types"

export function validateOrderEligibility(order: Order): { isEligible: boolean; message?: string } {
  // Check for no_return tag
  if (order.exclusions.noReturn) {
    return {
      isEligible: false,
      message: "This order is not eligible for returns. Please contact customer support for assistance.",
    }
  }

  // Check if there are any returnable items
  if (order.returnableItems.length === 0) {
    return {
      isEligible: false,
      message: "All items from this order have already been returned.",
    }
  }

  return { isEligible: true }
}

export function validateItemEligibility(
  item: OrderItem,
  order: Order
): { isEligible: boolean; message?: string } {
  // Check if item is monogrammed
  const hasMonogramInSku = item.sku.includes("MG")
  const hasMonogramInAttributes = item.customAttributes.some(
    (attr) => attr.key === "Monogram" || attr.key === "monogram" || attr.value.includes("MG")
  )

  const isMonogrammed = hasMonogramInSku || hasMonogramInAttributes

  // If monogrammed and no ignore_blockers tag, block return
  if (isMonogrammed && !order.exclusions.ignoreBlockers) {
    return {
      isEligible: false,
      message: "Monogrammed items cannot be returned unless authorized.",
    }
  }

  // Check if item requires shipping (digital items cannot be returned)
  if (!item.requiresShipping) {
    return {
      isEligible: false,
      message: "Digital items cannot be returned.",
    }
  }

  return { isEligible: true }
}

export function validateRefundEligibility(order: Order): { isEligible: boolean; message?: string } {
  // Check for alteration tag - if present, only store credit is allowed
  if (order.exclusions.alteration) {
    return {
      isEligible: false,
      message: "Due to alterations on this order, only store credit returns are available.",
    }
  }

  return { isEligible: true }
}

