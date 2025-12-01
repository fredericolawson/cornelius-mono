import { getProductsWithPrices } from "@/lib/shopify/client"
import { ProductGrid } from "@/components/products/product-grid"

export default async function ProductsPage() {
  const products = await getProductsWithPrices()
  const productTypes = Array.from(new Set(products.map((product) => product.productType)))

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1>Product Gallery</h1>
        <p className="text-muted-foreground">Browse our complete product collection</p>
      </div>
      <ProductGrid products={products} productTypes={productTypes} />
    </div>
  )
}
