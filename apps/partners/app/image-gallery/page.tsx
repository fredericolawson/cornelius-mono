import { getLifestyleImagesWithPrices } from "@/lib/shopify/client"
import { LifestyleImageGallery } from "@/components/lifestyle/lifestyle-gallery"

export const revalidate = 3600

export const metadata = {
  title: "Lifestyle Images Gallery",
  description: "Our lifestyle collection featuring curated images",
}

export default async function LifestylePage() {
  const lifestyleImages = await getLifestyleImagesWithPrices()

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1>Lifestyle Images Gallery</h1>
        <p className="text-muted-foreground">{lifestyleImages.length} curated lifestyle images</p>
      </div>
      <LifestyleImageGallery images={lifestyleImages} />
    </div>
  )
}
