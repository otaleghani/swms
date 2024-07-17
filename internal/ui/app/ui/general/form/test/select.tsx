"use client";

import { getTestData } from "./action";
import { TestComboboxSelect } from "./combo";
import { DialogDemo } from "./dialog_form";
import { useState } from "react";

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

export default function SelectTest({data}: {data:any}) {
  const [element, setElement] = useState("")
  const [list, setList] = useState(data)

  async function handleSetList() {
    console.log("gotHERE")
    const newValue = { value: "sandro", label: "pertini"}
    const newFrameworks = data
    newFrameworks.push(newValue)
    setList(newFrameworks)
    setElement(newValue.value)
  }

  return (
    <>
        <TestComboboxSelect list={list} element={element} setElement={setElement} />
        <input type="hidden" name="stocaz" value={element} />
        <DialogDemo handler={handleSetList} />
    </>
  )
}
