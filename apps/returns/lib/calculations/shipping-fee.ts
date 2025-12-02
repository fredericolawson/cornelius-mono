import type { ReturnType, ShippingService } from "@/types"

export function calculateShippingFee(
  shippingService: ShippingService | null,
  returnType: ReturnType,
  includeShipping: boolean
) {
  if (!shippingService || returnType !== "Refund" || !includeShipping) {
    return 0
  }

  return shippingService.fee
}

