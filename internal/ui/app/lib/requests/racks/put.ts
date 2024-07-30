"use server";

import { cookies } from "next/headers";
import { Rack } from "@/app/lib/types";

export async function putRack(r: Rack, id: string) {
  const jwt = cookies().get("access")?.value
  const req = await fetch(`http://localhost:8080/api/v1/racks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(r),
  })
  const res_body = await req.json();

  return res_body;
}
