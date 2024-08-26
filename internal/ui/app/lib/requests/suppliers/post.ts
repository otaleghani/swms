"use server";

import { cookies } from "next/headers"
import { Supplier } from "../../types";
import { revalidateTag } from "next/cache";

export async function PostSupplier(req_body: Supplier) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/suppliers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(req_body),
  })
  const res_body = await res.json();

  revalidateTag("suppliers");

  return res_body;
}
