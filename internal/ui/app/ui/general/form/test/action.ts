"use server"

export async function testAction(currentState: number, formData: FormData) {
  console.log(currentState)
  console.log(formData.get("stocaz"))
  return currentState + 1
}
