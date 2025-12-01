"use client"

import { useState, useMemo } from "react"
import type { LifestyleImage } from "@/types/types"
import { LifestyleFilters } from "./lifestyle-filters"
import { LifestyleGrid } from "./lifestyle-grid"

type LifestyleImageGalleryProps = {
  images: LifestyleImage[]
}

export function LifestyleImageGallery({ images }: LifestyleImageGalleryProps) {
  const [selectedProductType, setSelectedProductType] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredImages = useMemo(() => {
    const filtered = images.filter((image) => {
      const productTypeMatch = !selectedProductType || image.product.productType === selectedProductType

      const categoryMatch = !selectedCategory || image.product.category.includes(selectedCategory)

      const searchMatch = !searchQuery || image.product.title.toLowerCase().includes(searchQuery.toLowerCase())

      return productTypeMatch && categoryMatch && searchMatch
    })

    return filtered.sort((a, b) => {
      return a.product.productType.localeCompare(b.product.productType)
    })
  }, [images, selectedProductType, selectedCategory, searchQuery])

  const handleProductTypeChange = (productType: string) => {
    setSelectedProductType(productType)
    setSelectedCategory("")
    setSearchQuery("")
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedProductType("")
    setSearchQuery("")
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setSelectedProductType("")
    setSelectedCategory("")
  }

  const handleClearFilters = () => {
    setSelectedProductType("")
    setSelectedCategory("")
    setSearchQuery("")
  }

  return (
    <>
      <LifestyleFilters
        images={images}
        selectedProductType={selectedProductType}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onProductTypeChange={handleProductTypeChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
      />

      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredImages.length} of {images.length} lifestyle images
        </p>
      </div>

      <LifestyleGrid images={filteredImages} />
    </>
  )
}
