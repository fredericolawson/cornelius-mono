"use client"

import { Button } from "@workspace/ui/components/button"

type DownloadButtonProps = {
  url: string
  title: string
}

export function DownloadButton({ url, title }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `${title.replace(/\s+/g, "_")}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  return (
    <Button onClick={handleDownload} variant="outline">
      Download {title}
    </Button>
  )
}
