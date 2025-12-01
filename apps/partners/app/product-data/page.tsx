import { getProductsWithPrices } from "@/lib/shopify/client"
import { ProductTable } from "@/components/product-table/product-table"

export const metadata = {
  title: "Product Table",
  description: "View and download all product data",
}

export default async function ProductTablePage() {
  const products = await getProductsWithPrices()

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1>Product Table</h1>
        <p className="text-muted-foreground">View and export product data</p>
      </div>
      <ProductTable initialProducts={products} />
    </div>
  )
}
