import { getProductByHandleWithPrices, getProductsHandles } from "@/lib/shopify/client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { DownloadAll } from "@/components/products/download-all"
import { ProductPriceDisplay } from "@/components/products/product-price-display"

export async function generateStaticParams() {
  if (!process.env.SHOPIFY_STORE_NAME || !process.env.SHOPIFY_ACCESS_TOKEN) {
    return []
  }

  try {
    const data = await getProductsHandles()
    return data.products.edges.map((edge: any) => ({
      handle: edge.node.handle,
    }))
  } catch (error) {
    console.error("Failed to generate static params:", error)
    return []
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const data = await getProductByHandleWithPrices(handle)
  const product = data.productByHandle

  if (!product) return <div className="container py-10">Product not found</div>

  return (
    <div className="flex flex-col gap-4 py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-medium">{product.title}</CardTitle>
            <ProductPriceDisplay product={product} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.featuredImage?.url || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <DownloadAll
                images={product.images.edges.map((edge: any) => ({
                  url: edge.node.url,
                  title: product.title,
                }))}
              />
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/product-table">← Back</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`https://www.corneliajames.com/products/${product.handle}`} target="_blank">
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.images.edges.map((edge: any) => (
              <div key={edge.node.url} className="relative aspect-square overflow-hidden rounded-lg border">
                <Image src={edge.node.url} alt={product.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
