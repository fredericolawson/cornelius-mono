"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@workspace/ui/components/item"
import { useState, useEffect } from "react"

const currencies = [
  {
    code: "GBP",
    name: "British Pound",
  },
  {
    code: "USD",
    name: "United States Dollar",
  },
]

export function CurrencySelector() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  useEffect(() => {
    const stored = localStorage.getItem("selected-currency")
    if (stored) {
      const found = currencies.find((c) => c.code === stored)
      if (found) setSelectedCurrency(found)
    }
  }, [])

  const handleCurrencyChange = (currency: (typeof currencies)[0]) => {
    setSelectedCurrency(currency)
    localStorage.setItem("selected-currency", currency.code)
    window.dispatchEvent(new CustomEvent("currency-change", { detail: currency.code }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="w-fit">
          Prices: {selectedCurrency?.code || "GBP"} <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 [--radius:0.65rem]" align="end">
        {currencies.map((currency) => (
          <DropdownMenuItem key={currency.code} className="p-0" onClick={() => handleCurrencyChange(currency)}>
            <Item size="sm" className="w-full p-2">
              <ItemContent className="gap-0.5">
                <ItemTitle>{currency.code}</ItemTitle>
                <ItemDescription>{currency.name}</ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
