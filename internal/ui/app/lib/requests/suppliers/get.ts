"use server";

import { cookies } from "next/headers";
import { Supplier, SupplierInfo } from "../../types";

export async function GetSuppliers() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/suppliers/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["suppliers"] },
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
  return response as Supplier[];
}

export async function GetSuppliersWithData() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/suppliers/extra/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["suppliers"] },
  })

  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return [];
  }

  const response = [] as SupplierInfo[];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].supplier.id != "nil") {
      response.push(body.data[i] as SupplierInfo)
    }
  }
  return response;
}

export async function GetSupplierById(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/suppliers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["suppliers"] },
  })

  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return {} as Supplier;
  }

  return body.data as Supplier;
}
