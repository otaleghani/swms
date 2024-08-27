"use server";

import { cookies } from "next/headers"
import { SupplierCode } from "../../../types";

export async function postSupplierCode(req_body: SupplierCode) {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/supplier-codes/", {
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
