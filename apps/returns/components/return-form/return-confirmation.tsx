"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export function ReturnConfirmation({
  confirmed,
  setConfirmed,
}: {
  confirmed: boolean
  setConfirmed: (confirmed: boolean) => void
}) {
  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Checkbox id="confirm" checked={confirmed} onCheckedChange={(checked) => setConfirmed(!!checked)} />
          <div className="flex-1">
            <Label htmlFor="confirm" className="cursor-pointer font-semibold">
              I confirm that:
            </Label>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-5 list-disc">
              <li>All items are unworn and in new condition with tags attached</li>
              <li>I understand the return policy and fees</li>
              <li>I agree to ship items within 30 days</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

