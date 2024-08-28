"use server";

import { cookies } from "next/headers"
import { Category } from "../../types";

export async function postCategory(req_body: Category) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/categories/", {
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
