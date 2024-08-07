"use server";

import { cookies } from "next/headers";
import { Rack } from "../../types";

export async function getRacksByAisleIdWithExtra(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/aisles/${id}/racks/extra`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["racks"] },
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

export async function getRackById(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/racks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["racks"] },
  })
  const body = await res.json()
  if (body.code !== 200) {
    // error state?
    return {} as Rack;
  }
  return body.data as Rack;
}

export async function getRacks() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/racks/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["racks"] },
  })
  const body = await res.json()
  if (body.code !== 200) {
    // error state?
    return [] as Rack[];
  }
  const response = [] as Rack[];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].id != "nil") {
      response.push(body.data[i])
    }
  }
  return response;
}

export async function getRacksWithData() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/racks/extra/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["racks"] },
  })
  const body = await res.json()
  if (body.code !== 200) {
    // error state?
    return [];
  }
  const response = [];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].rack.id != "nil") {
      response.push(body.data[i])
    }
  }
  return response;
}
