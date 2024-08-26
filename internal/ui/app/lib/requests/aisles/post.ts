"use server";

import { cookies } from "next/headers"
import { Aisle } from "../../types";

export async function PostAislesBulk(req_body: any) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/aisles/bulk/", {
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

export async function PostAisles(req_body: Aisle) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/aisles/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(req_body),
  })
  const res_body = await res.json()

  return res_body;
}
