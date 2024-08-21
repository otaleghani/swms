"use client";

import { useActionState } from "react"
import { FormFileUploadTestingState, TestFileUploadAction } from "./testig-action"

export default function FormFileUploadTesting() {
  const initialState: FormFileUploadTestingState = {
    status: "",
  }
  const [state, action] = useActionState(TestFileUploadAction, initialState);

  return (
    <form action={action} encType="multipart/form-data">
      <input 
      type="file" 
      id="file" 
      name="file" 
      accept="image/png, image/jpeg"
      multiple />
      <div>{state.status}</div>
      <button type="submit">daje</button>
    </form>
  )
}
