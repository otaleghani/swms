"use server";

import { cookies } from "next/headers";
import { Aisle } from "@/app/lib/types";

export async function PutAisle(a: Aisle, id: string) {
  const jwt = cookies().get("access")?.value
  const req = await fetch(`http://localhost:8080/api/v1/aisles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(a),
  })
  const res_body = await req.json()

  return res_body
}
