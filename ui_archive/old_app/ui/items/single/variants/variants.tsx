'use client'

import { Card, CardTitle, CardHeader, CardContent } from "@/components/card"
import { useState } from "react"
import { VariantPicker } from "@/app/ui/items/single/variants/picker"
import { VariantData } from "@/app/ui/items/single/variants/data"

// testing purpose
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "anvedioh",
    label: "Anvedi",
  },
]

export function Variants() {
  const [value, setValue] = useState(frameworks[0])

  return (
    <Card className="mb-4">
      <CardHeader className="">
        <CardTitle>Variants</CardTitle>
        <VariantPicker data={frameworks} valueSetter={setValue} />
      </CardHeader>
      <CardContent>
        <div>
          the actual data
          <VariantData data={value} />
        </div>
      </CardContent>
    </Card>
  )
}
