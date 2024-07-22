"use server";

import { cookies } from "next/headers";

export default async function getZones() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/zones/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["zones"] },
  })

  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return [];
  }

  const response = [];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].id != "nil") {
      response.push(body.data[i])
    }
  }
  return response;
}
