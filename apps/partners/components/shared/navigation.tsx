"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import { CurrencySelector } from "./currency-selector"
import { ButtonGroup } from "@workspace/ui/components/button-group"

export function Navigation() {
  return (
    <header className="border-b mb-8">
      <div className="container mx-auto py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Image src="/logo_solo.png" alt="Cornelia James" width={200} height={24} priority />
          <span className="text-sm font-mono text-muted-foreground">for Partners</span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLinks />
        </div>
      </div>
    </header>
  )
}

function NavLinks() {
  const links = [
    { href: "/product-gallery", label: "Product Gallery" },
    { href: "/image-gallery", label: "Image Gallery" },
    { href: "/product-data", label: "Product Data" },
    { href: "/brand-guide", label: "Brand Guide" },
  ]
  return (
    <ButtonGroup>
      <ButtonGroup>
        {links.map((link) => (
          <Button key={link.href} asChild variant="outline" size="lg">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        <CurrencySelector />
      </ButtonGroup>
    </ButtonGroup>
  )
}
