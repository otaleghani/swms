"use server";

import { cookies } from "next/headers";
import { Subcategory } from "@/app/lib/types";

export async function putSubcategory(c: Subcategory, id: string) {
  const jwt = cookies().get("access")?.value
  const req = await fetch(`http://localhost:8080/api/v1/subcategories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(c),
  })
  const res_body = await req.json()

  return res_body
}
