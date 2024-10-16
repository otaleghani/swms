"use server";

import { cookies } from "next/headers";
import { Item, Response } from "../../types";

export async function getItems() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/items/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["items"] },
  })
  const body = await res.json()

  //if (body.code === undefined) {
  //  return [];
  //}
  
  const response: Item[] = [];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].id != "nil") {
      response.push(body.data[i])
    }
  }

  return response;
}

export async function getItemById(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/items/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["items"] },
  })

  const body = await res.json()

  if (body.code === undefined || body.code !== 200) {
    return {} as Item;
  }

  return body.data as Item;
}

