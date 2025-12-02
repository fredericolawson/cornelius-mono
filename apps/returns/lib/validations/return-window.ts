import type { Order } from "@/types"

const STANDARD_WINDOW_DAYS = 60

export function validateReturnWindow(order: Order): { isValid: boolean; message?: string } {
  const validUntil = order.validUntil
  const isExpired = new Date() > validUntil
  const hasExtension = order.exclusions.allowReturn

  // If allow_return tag is present, override expiration
  if (hasExtension) {
    return { isValid: true }
  }

  if (isExpired) {
    return {
      isValid: false,
      message: `The return window for this order has expired. Returns must be initiated within ${STANDARD_WINDOW_DAYS} days of shipment.`,
    }
  }

  return { isValid: true }
}

