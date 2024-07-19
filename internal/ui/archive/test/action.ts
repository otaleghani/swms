"use server"

import { cookies } from "next/headers"

export async function testAction(currentState: number, formData: FormData) {
  console.log(currentState)
  console.log(formData.get("stocaz"))
  return currentState + 1
}

export async function handlerForm(currentState: number, formDate: FormData) {
  console.log(currentState)
  return currentState + 1
}

export async function getTestData() {
  console.log("helo")
  // const jwt = cookies().get("access")?.value

  // const res = await fetch("http://localhost:8080/api/v1/items/", {
  //   method: "GET",
  //   headers: { 
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${jwt}`,
  //   },
  // })
  // const resBody = await res.json()
const resBosy = [
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
  
  return resBody
}
