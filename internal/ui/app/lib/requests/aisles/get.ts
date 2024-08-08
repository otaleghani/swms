"use server";

import { cookies } from "next/headers";
import { Aisle } from "../../types";

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
    next: { tags: ["aisles"] },
  })
  const body = await res.json()
  if (body.code !== 200) {
    // error state?
    return [];
  }
  const response = [];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].aisle.id != "nil") {
      response.push(body.data[i])
    }
  }
  return response;
}

export async function getAisleById(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/aisles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["aisles"] },
  })

  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return {} as Aisle;
  }

  return body.data as Aisle;
}

export async function getAisles() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/aisles/", {
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
    return [] as Aisle[];
  }

  const response = [];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].id != "nil") {
      response.push(body.data[i])
    }
  }
 
  return response;
}

export async function getAisleByRack(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/racks/${id}/aisle`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["aisles"] },
  })
  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return {} as Aisle;
  }

  return body.data as Aisle;
}

export async function getAisleByShelf(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/shelfs/${id}/aisle`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["aisles"] },
  })
  const body = await res.json()
  if (body.code !== 200) {
    // error state?
    return {} as Aisle;
  }
  return body.data as Aisle;
}
