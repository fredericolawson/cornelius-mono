"use client"

import { useState, useEffect } from "react"

export function useCurrency() {
  const [currency, setCurrency] = useState<"GBP" | "USD">("GBP")

  useEffect(() => {
    const stored = localStorage.getItem("selected-currency")
    if (stored === "USD" || stored === "GBP") {
      setCurrency(stored)
    }

    const handleCurrencyChange = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail === "USD" || customEvent.detail === "GBP") {
        setCurrency(customEvent.detail)
      }
    }

    window.addEventListener("currency-change", handleCurrencyChange)
    return () => window.removeEventListener("currency-change", handleCurrencyChange)
  }, [])

  return currency
}
