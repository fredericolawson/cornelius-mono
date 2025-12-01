import { Button } from "@workspace/ui/components/button"
import { Empty, EmptyContent, EmptyDescription, EmptyTitle, EmptyHeader, EmptyMedia } from "@workspace/ui/components/empty"
import { Search } from "lucide-react"

export function NotFoundUI() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>Page Not Found</EmptyTitle>
      <EmptyDescription>Sorry, the requested page could not be found!</EmptyDescription>
      <EmptyContent>
        <Button asChild>
          <a href="/">Return Home</a>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
