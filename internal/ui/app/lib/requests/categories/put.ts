"use server";

import { cookies } from "next/headers";
import { Category } from "@/app/lib/types";

export async function putCategory(c: Category, id: string) {
  const jwt = cookies().get("access")?.value
  const req = await fetch(`http://localhost:8080/api/v1/categories/${id}`, {
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
