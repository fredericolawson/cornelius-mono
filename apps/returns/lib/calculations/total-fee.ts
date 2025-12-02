import type { ReturnType } from "@/types"
import { calculateTaxDeduction } from "./tax-deduction"

export function calculateTotalFee(params: {
  returnType: ReturnType
  discountedSubtotal: number
  taxRate: number
  countryCode: string
  restockingPercentage: number
  shippingFee: number
}) {
  const { returnType, discountedSubtotal, taxRate, countryCode, restockingPercentage, shippingFee } = params

  if (returnType === "Credit") {
    return {
      calculatedTotalFee: discountedSubtotal,
      taxDeduction: 0,
      restockingFee: 0,
    }
  }

  const taxDeduction = calculateTaxDeduction(discountedSubtotal, taxRate, countryCode)
  const restockingFee = (discountedSubtotal - taxDeduction) * restockingPercentage
  const calculatedTotalFee = shippingFee + restockingFee + taxDeduction

  return {
    calculatedTotalFee,
    taxDeduction,
    restockingFee,
  }
}

