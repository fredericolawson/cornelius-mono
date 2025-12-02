import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"

export function ExistingReturnsList({ orderName, returnIds }: { orderName: string; returnIds: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing Returns</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600">
          You have {returnIds.length} existing return{returnIds.length > 1 ? "s" : ""} for order {orderName}
        </p>
        <div className="flex flex-col gap-2">
          {returnIds.map((returnId) => (
            <Button key={returnId} variant="outline" asChild>
              <Link href={`/returns/${returnId}`}>View Return #{returnId}</Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

