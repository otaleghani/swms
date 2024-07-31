"use server";

import { cookies } from "next/headers";

export async function getShelfsByRackWithExtra(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/racks/${id}/shelfs/extra`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["shelfs"] },
  });
  const body = await res.json();
  if (body.data === undefined) {
    return []
  }
  if (body.data === null) {
    return []
  }
  return body.data;
}
