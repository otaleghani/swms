"use server";

import { cookies } from "next/headers";

export async function getAislesByZoneId(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/zones/${id}/aisles`, {
    
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["aisles"] },
  });
  const body = await res.json();

  if (body.data === undefined) {
    return []
  }
  
  return body.data;
}
