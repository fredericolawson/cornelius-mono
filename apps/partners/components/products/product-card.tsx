"use client"

import type { ShopifyProduct } from "@/types/types"
import Image from "next/image"
import { Card, CardContent } from "@workspace/ui/components/card"
import { useCurrency } from "@/lib/hooks/use-currency"

type ProductCardProps = {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
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
    <Card className="overflow-hidden transition-shadow hover:shadow-lg py-0">
      <CardContent className="p-0">
        <div className="aspect-square relative bg-muted">
          <Image alt={product.title} src={product.featuredImage?.url || "/placeholder.svg"} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-2">{product.title}</h3>
          <div className="flex gap-4 text-sm text-muted-foreground justify-between mt-2">
            <span>
              MSRP {currencySymbol}
              {msrp}
            </span>
            <span>
              Wholesale {currencySymbol}
              {wholesale}
            </span>
          </div>
        </CardContent>
      </CardContent>
    </Card>
  )
}
