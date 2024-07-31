"use server";

import { cookies } from "next/headers";
import { Shelf } from "../../types";

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

export async function getShelfs() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/shelfs/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["shelfs"] },
  })
  const body = await res.json()
  if (body.code !== 200) {
    // error state?
    return [] as Shelf[];
  }
  const response = [] as Shelf[];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].id != "nil") {
      response.push(body.data[i])
    }
  }
}
