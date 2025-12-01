"use client"

import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import type { LifestyleImage } from "@/types/types"
import { Separator } from "@workspace/ui/components/separator"
import { Search } from "lucide-react"

type LifestyleFiltersProps = {
  images: LifestyleImage[]
  selectedProductType: string
  selectedCategory: string
  searchQuery: string
  onProductTypeChange: (productType: string) => void
  onCategoryChange: (category: string) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
}

export function LifestyleFilters({
  images,
  selectedProductType,
  selectedCategory,
  searchQuery,
  onProductTypeChange,
  onCategoryChange,
  onSearchChange,
  onClearFilters,
}: LifestyleFiltersProps) {
  const productTypes = Array.from(new Set(images.map((image) => image.product.productType).filter(Boolean))).sort()

  const categories = Array.from(new Set(images.flatMap((image) => image.product.category).filter(Boolean))).sort()

  const hasActiveFilters = selectedProductType || selectedCategory || searchQuery

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm font-medium text-gray-700">Product Type</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedProductType === "" ? "default" : "outline"}
                size="sm"
                onClick={() => onProductTypeChange("")}
              >
                All
              </Button>
              {productTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedProductType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => onProductTypeChange(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
          <Separator orientation="vertical" className="h-full" />

          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm font-medium text-gray-700">Category</span>
            <div className="flex flex-wrap gap-2">
              <Button variant={selectedCategory === "" ? "default" : "outline"} size="sm" onClick={() => onCategoryChange("")}>
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium text-gray-700">Search</span>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by product title..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-gray-500 hover:text-gray-700">
            Clear All Filters
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
