export function calculateTaxDeduction(
  discountedSubtotal: number,
  taxRate: number,
  countryCode: string
) {
  if (countryCode === "GB") return 0

  return discountedSubtotal - discountedSubtotal / (1 + taxRate)
}

