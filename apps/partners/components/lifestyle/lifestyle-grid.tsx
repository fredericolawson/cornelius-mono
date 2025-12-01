"use client"

import { useState } from "react"
import Image from "next/image"
import { AspectRatio } from "@workspace/ui/components/aspect-ratio"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Download } from "lucide-react"
import { ResponsiveGrid } from "@/components/shared/responsive-grid"
import type { LifestyleImage } from "@/types/types"
import { useCurrency } from "@/lib/hooks/use-currency"
import { LifestyleImageDialog } from "./lifestyle-image-dialog"

type LifestyleGridProps = {
  images: LifestyleImage[]
}

export function LifestyleGrid({ images }: LifestyleGridProps) {
  const currency = useCurrency()
  const [selectedImage, setSelectedImage] = useState<LifestyleImage | null>(null)

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p>No lifestyle images found</p>
      </div>
    )
  }

  return (
    <>
      <ResponsiveGrid>
        {images.map((image, index) => {
          const priceAmount = image.product.prices
            ? currency === "USD"
              ? image.product.prices.usd
              : image.product.prices.gbp
            : image.product.price.amount
          const currencySymbol = currency === "USD" ? "$" : "£"

          return (
            <Card
              key={`${image.id}-${index}`}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all my-0 py-0 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <CardContent className="p-0">
                <AspectRatio ratio={1}>
                  <Image
                    src={image.url}
                    alt={image.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(image.url, `${image.product.handle}-lifestyle-${image.id.split("/").pop()}.jpg`)
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <h3 className="text-white font-medium text-sm mb-2 line-clamp-2">{image.product.title}</h3>
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {currencySymbol}
                      {parseFloat(priceAmount).toFixed(2)}
                    </Badge>
                  </div>
                </AspectRatio>
              </CardContent>
            </Card>
          )
        })}
      </ResponsiveGrid>

      <LifestyleImageDialog
        image={selectedImage}
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      />
    </>
  )
}
