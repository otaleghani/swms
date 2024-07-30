"use server";

import { cookies } from "next/headers";

export async function postRacksBulk(req_body: any) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/racks/bulk/", {
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
