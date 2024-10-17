"use client";

import { useActionState } from "react"
import { bobDoSomething, FormType } from "./action";

export default function Form() {
  const initialState: FormType = {message: "", errors: {}, counter: 0}
  const [state, formAction] = useActionState(bobDoSomething, initialState)
  return (
    <form action={formAction}>
      {state?.counter}
      <button type="submit">BOOOOOB</button>
    </form>
  )
}
