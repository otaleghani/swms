"use server";

import { cookies } from "next/headers";

export async function DeleteSupplierCode(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/supplier-codes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
  })
  const body = await res.json()
}
