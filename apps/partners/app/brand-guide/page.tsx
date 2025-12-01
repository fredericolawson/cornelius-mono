import { DownloadButton } from "@/components/shared/download-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default function BrandGuide() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1>Brand Guide</h1>
        <p className="text-muted-foreground">Brand assets and guidelines for partners</p>
      </div>

      {/* Colors Section */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
          <CardDescription>Our brand color palette</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-lg bg-[#1a1a1a]" />
              <div className="text-center">
                <p className="font-medium">Primary</p>
                <p className="text-sm text-muted-foreground">#1a1a1a</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-lg bg-[#F5F3ED] border" />
              <div className="text-center">
                <p className="font-medium">Secondary</p>
                <p className="text-sm text-muted-foreground">#F5F3ED</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fonts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Fonts</CardTitle>
          <CardDescription>Our brand typography</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-xl font-serif">ITC Caslon No 224 Medium</p>
            <p className="text-sm text-muted-foreground">Headings</p>
            <DownloadButton url="/fonts/ITCCaslon224StdMedium.ttf" title="ITC Caslon No 224 Medium" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-sans">Avenir Next Medium</p>
            <p className="text-sm text-muted-foreground">Body text</p>
            <DownloadButton url="/fonts/AvenirNextLTPro-Regular.otf" title="Avenir Next Medium" />
          </div>
        </CardContent>
      </Card>

      {/* Logos Section */}
      <Card>
        <CardHeader>
          <CardTitle>Logos</CardTitle>
          <CardDescription>Download our brand logos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-4 p-4 border rounded-lg">
              <img src="/logo_solo.png" alt="Primary Logo" className="h-32 object-contain" />
              <div className="text-center space-y-2">
                <p className="font-medium">Primary Logo</p>
                <DownloadButton url="/logo_solo.png" title="Primary Logo" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Other Assets</CardTitle>
          <CardDescription>Additional brand materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 p-4 border rounded-lg max-w-md">
            <img src="/cornelia.png" alt="Cornelia James (founder)" className="w-full object-contain" />
            <div className="text-center space-y-2">
              <p className="font-medium">Cornelia James (founder)</p>
              <DownloadButton url="/cornelia.png" title="Cornelia" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
