"use client"

import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog"
import { Download, X } from "lucide-react"
import type { LifestyleImage } from "@/types/types"

type LifestyleImageDialogProps = {
  image: LifestyleImage | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LifestyleImageDialog({ image, open, onOpenChange }: LifestyleImageDialogProps) {
  const handleDownload = async () => {
    if (!image) return

    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${image.product.handle}-lifestyle-${image.id.split("/").pop()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  if (!image) return null

  const aspectRatio = image.width / image.height

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{image.product.title}</DialogTitle>
        </DialogHeader>

        <div className="relative w-full flex items-center justify-center">
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: `${image.width}px`,
              aspectRatio: aspectRatio.toString(),
            }}
          >
            <Image
              src={image.url}
              alt={image.altText}
              fill
              sizes="(max-width: 1920px) 100vw, 1920px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-1" />
            Close
          </Button>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
