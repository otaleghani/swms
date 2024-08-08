"use server";

import { cookies } from "next/headers";
import { Zone } from "../../types";

export async function getZones() {
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
  return response as Zone[];
}

export async function getZonesWithData() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/zones/extra/", {
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

export async function getZoneById(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/zones/${id}`, {
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
    return {} as Zone;
  }

  return body.data as Zone;
}

export async function getZoneByAisle(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/aisles/${id}/zone`, {
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
    return {} as Zone;
  }

  return body.data as Zone;
}

export async function getZoneByRack(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/racks/${id}/zone`, {
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
    return {} as Zone;
  }
  return body.data as Zone;
}

export async function getZoneByShelf(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/shelfs/${id}/zone`, {
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
    return {} as Zone;
  }
  return body.data as Zone;
}
