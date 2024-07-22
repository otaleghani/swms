"use server"

import { cookies } from "next/headers"


export default async function PostZonesBulk(req_body: any) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/bulk_add/zones/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: req_body,
  })
  const res_body = await res.json()
  return res_body
}
