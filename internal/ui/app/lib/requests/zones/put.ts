"use server";

import { cookies } from "next/headers";
import { Zone } from "@/app/lib/types";

export async function PutZone(z: Zone, id: string) {
  const jwt = cookies().get("access")?.value
  const req = await fetch(`http://localhost:8080/api/v1/zones/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(z),
  })
  const res_body = await req.json()

  return res_body
}
