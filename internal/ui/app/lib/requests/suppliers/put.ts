"use server";

import { cookies } from "next/headers";
import { Supplier } from "@/app/lib/types";

export async function PutSupplier(s: Supplier, id: string) {
  const jwt = cookies().get("access")?.value
  const req = await fetch(`http://localhost:8080/api/v1/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(s),
  })
  const res_body = await req.json()

  return res_body
}
