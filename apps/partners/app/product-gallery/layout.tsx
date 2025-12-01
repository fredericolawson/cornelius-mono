import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Gallery",
  description: "Browse our complete product collection",
}

export default function ProductGalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
