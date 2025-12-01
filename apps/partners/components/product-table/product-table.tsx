"use client"

import React, { useState } from "react"
import type { ShopifyProduct } from "@/types/types"
import { Button } from "@workspace/ui/components/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { useCurrency } from "@/lib/hooks/use-currency"

type ProductTableProps = {
  initialProducts: ShopifyProduct[]
}

export function ProductTable({ initialProducts }: ProductTableProps) {
  const [products] = useState(initialProducts)
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const currency = useCurrency()

  // Group products by title and color
  const groupedProducts = products.reduce(
    (acc, product) => {
      product.variants?.nodes.forEach((variant) => {
        const color = variant.selectedOptions[0]?.value || "N/A"
        const image = variant.image?.url || product.featuredImage?.url || "N/A"
        const key = `${product.title}-${color}`
        if (!acc[key]) {
          acc[key] = { ...product, color, image, variants: [] }
        }
        acc[key].variants.push(variant)
      })
      return acc
    },
    {} as Record<string, any>
  )

  const toggleRow = (key: string) => {
    setExpandedRows((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getProductPrice = (product: any) => {
    if (product.prices) {
      return currency === "USD" ? product.prices.usd : product.prices.gbp
    }
    return product.priceRangeV2.maxVariantPrice.amount
  }

  const currencySymbol = currency === "USD" ? "$" : "£"

  const fieldHeaders = [
    "Image",
    "title",
    "Product Type",
    "Color",
    "Length",
    "Composition",
    "Care",
    "Features",
    "Size",
    `Price (${currency})`,
    "SKU",
    "Country of Origin",
  ]

  const downloadCSV = () => {
    const csvContent = [
      fieldHeaders.join(","),
      ...products.flatMap((product) =>
        (product.variants?.nodes || []).map((variant: any) => {
          const price = getProductPrice(product)
          return [
            variant.image?.url || product.featuredImage?.url,
            product.title,
            product.productType,
            variant.selectedOptions[0]?.value || "",
            "", // length - would need to be in product data
            "", // composition - would need to be in product data
            "", // care - would need to be in product data
            "", // features - would need to be in product data
            variant.selectedOptions[1]?.value?.replace("½", ".5") || "",
            Math.round(Number(price)),
            variant.sku,
            "GB",
          ].join(",")
        })
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "product_data.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={downloadCSV}>Download CSV</Button>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expand</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Length (inches)</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Composition</TableHead>
              <TableHead>Care</TableHead>
              <TableHead>Price ({currency})</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(groupedProducts).map(([key, product]) => (
              <React.Fragment key={key}>
                <TableRow>
                  <TableCell>
                    <button onClick={() => toggleRow(key)}>{expandedRows[key] ? "▼" : "▶"}</button>
                  </TableCell>
                  <TableCell className="w-16">
                    <a href={product.image} target="_blank" rel="noreferrer">
                      <img src={product.image} alt={product.title} className="h-16 w-16 object-cover" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={`/products/${product.handle}`}>
                      {product.title} - {product.color}
                    </a>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {currencySymbol}
                    {Math.round(Number(getProductPrice(product)))}
                  </TableCell>
                </TableRow>
                {expandedRows[key] && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Color</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>SKU</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {product.variants.map((variant: any) => (
                            <TableRow key={variant.sku}>
                              <TableCell>{variant.selectedOptions[0]?.value || "N/A"}</TableCell>
                              <TableCell>{variant.selectedOptions[1]?.value || "N/A"}</TableCell>
                              <TableCell>{variant.sku}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
