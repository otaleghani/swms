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

  // if (body.data === "null") {
  //   return []
  // }
  
  return body.data;
}

export async function getAislesByZoneIdWithExtra(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/zones/${id}/aisles/extra`, {
    
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

  if (body.data === null) {
    return []
  }
  
  return body.data;
}

export async function getAislesWithData() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/aisles/extra/", {
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
    if (body.data[i].zone.id != "nil") {
      response.push(body.data[i])
    }
  }
  return response;
}
