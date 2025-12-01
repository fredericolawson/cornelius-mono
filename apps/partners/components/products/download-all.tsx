"use client"

import { Button } from "@workspace/ui/components/button"

type DownloadAllProps = {
  images: Array<{ url: string; title: string }>
}

export function DownloadAll({ images }: DownloadAllProps) {
  if (!images || images.length === 0) return null

  const handleDownloadAll = async () => {
    for (const { url, title } of images) {
      if (!url) continue

      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Network response was not ok")

        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = blobUrl
        a.download = `${title.replace(/\s+/g, "_")}.jpg`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(blobUrl)
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
      }
    }
  }

  return (
    <Button onClick={handleDownloadAll} title="Download All Images">
      Download all images
    </Button>
  )
}
