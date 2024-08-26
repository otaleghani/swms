"use server";

import { cookies } from "next/headers";
import { Shelf } from "../../types";

export async function postShelfsBulk(req_body: Shelf) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/shelfs/bulk/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(req_body),
  })
  const res_body = await res.json()

  return res_body
}

export async function PostShelfs(req_body: Shelf) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/shelfs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(req_body),
  })
  const res_body = await res.json();
  return res_body;
}
