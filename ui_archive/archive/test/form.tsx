"use client"

import { useActionState, useState } from "react"
import { TestComboboxSelect } from "./combo"
import { testAction } from "./action"
import { Button } from "@/components/button"
import { DialogDemo } from "./dialog_form"
import SelectTest from "./select"


export default function TestForm({data}: {data:any[]}) {
  const [state, action] = useActionState(testAction, 0)

  return (
    <>
      <form action={action}>
        <SelectTest data={data} />
        <button type="submit">LET's FUCKING GO</button>
      </form>
    </>
  )
}

