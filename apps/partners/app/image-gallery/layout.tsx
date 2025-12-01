import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "Browse our complete product image collection, with high-resolution images available for download.",
}

export default function ProductGalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
