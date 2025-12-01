import Link from "next/link"

import { Item, ItemContent, ItemDescription, ItemTitle, ItemActions, ItemMedia } from "@workspace/ui/components/item"
import { BookOpenIcon, ExternalLinkIcon, ImageIcon, TableIcon } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto w-full h-full flex flex-col gap-8">
      <Card className="">
        <CardHeader>
          <CardTitle className="">Welcome to our Partner Portal</CardTitle>
          <CardDescription className="">
            We've built a collection of tools to make it smoother and faster to work with us. Select an option below to get
            started.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-4 w-full flex-1 bg-card p-4 rounded-md">
        <MenuItem
          href={"/product-gallery"}
          title="Product Gallery"
          description="Our Product Library"
          icon={<BookOpenIcon className="text-emerald-500" />}
        />
        <MenuItem
          href={"/image-gallery"}
          title="Image Gallery"
          description="Curated lifestyle photography"
          icon={<ImageIcon className="text-emerald-500" />}
        />
        <MenuItem
          href={"/product-data"}
          title="Product Data"
          description="Product Data Grid & CSV Download"
          icon={<TableIcon className="text-emerald-500" />}
        />
        <MenuItem
          href={"/brand-guide"}
          title="Brand Guide"
          description="Our Brand Guide"
          icon={<BookOpenIcon className="text-emerald-500" />}
        />
        <MenuItem
          href={"https://www.corneliajames.com"}
          title="Our Website"
          description="corneliajames.com"
          icon={<ExternalLinkIcon className="text-emerald-500" />}
        />
      </div>
    </div>
  )
}

function MenuItem({
  icon,
  href,
  title,
  description,
}: {
  icon: React.ReactNode
  href: string
  title: string
  description: string
}) {
  return (
    <Item variant="outline" asChild>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <ItemMedia variant="icon">{icon}</ItemMedia>
        <ItemContent>
          <ItemTitle className="">{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ExternalLinkIcon className="size-4" />
        </ItemActions>
      </Link>
    </Item>
  )
}
