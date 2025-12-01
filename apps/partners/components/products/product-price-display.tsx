"use client"

import { Badge } from "@workspace/ui/components/badge"
import { useCurrency } from "@/lib/hooks/use-currency"
import type { ShopifyProduct } from "@/types/types"

type ProductPriceDisplayProps = {
  product: ShopifyProduct
}

export function ProductPriceDisplay({ product }: ProductPriceDisplayProps) {
  const currency = useCurrency()

  const priceAmount = product.prices
    ? currency === "USD"
      ? product.prices.usd
      : product.prices.gbp
    : product.priceRangeV2.maxVariantPrice.amount

  const msrp = parseFloat(priceAmount).toFixed(2)
  const wholesale = parseFloat(String(Number(msrp) * 0.46)).toFixed(2)
  const currencySymbol = currency === "USD" ? "$" : "£"

  return (
    <div className="flex gap-2">
      <Badge variant="secondary">
        MSRP {currencySymbol}
        {msrp}
      </Badge>
      <Badge>
        Wholesale {currencySymbol}
        {wholesale}
      </Badge>
    </div>
  )
}
