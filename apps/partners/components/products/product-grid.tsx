"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { ResponsiveGrid } from "@/components/shared/responsive-grid"
import type { ShopifyProduct } from "@/types/types"

type ProductGridProps = {
  products: ShopifyProduct[]
  productTypes: string[]
}

export function ProductGrid({ products, productTypes }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProductType, setSelectedProductType] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    let results = products

    if (selectedProductType) {
      results = results.filter((product) => product.productType === selectedProductType)
    }

    if (searchTerm) {
      results = results.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredProducts(results)
  }, [searchTerm, selectedProductType, products])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedProductType === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedProductType("")}
          >
            All
          </Button>
          {productTypes.map((type) => (
            <Button
              key={type}
              variant={selectedProductType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedProductType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <ResponsiveGrid>
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </ResponsiveGrid>
    </div>
  )
}
