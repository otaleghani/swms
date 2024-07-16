"use client"

import { useActionState, useState } from "react"
import { TestComboboxSelect } from "./combo"
import { testAction } from "./action"
import { Button } from "@/components/button"

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
]

export default function TestForm() {
  const [stocaz, setStocaz] = useState("")
  const [state, action] = useActionState(testAction, 0)

  return (
    <>
      <form action={action}>
        <TestComboboxSelect frameworks={frameworks} stocaz={stocaz} setStocaz={setStocaz} />      
        <input type="hidden" name="stocaz" value={stocaz} />
        <button type="submit">LET's FUCKING GO</button>

      </form>
    </>
  )
}

