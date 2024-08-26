"use server";

import { cookies } from "next/headers";
import { ItemAndSupplierCodes, SupplierCode, SupplierCodeInfo } from "../../../types";

export async function GetSupplierCodes() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/supplier-codes/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["supplier-codes"] },
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
  return response as SupplierCode[];
}

// TO DO
// export async function GetItemAndCodesBySupplier  // used in supplier/id pages to show items and codes related to those items

export async function GetItemAndCodesBySupplier(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(
    `http://localhost:8080/api/v1/supplier/${id}/codes/`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      next: { tags: ["supplier-codes"] },
    }
  );

  const body = await res.json();
  if (body.code !== 200) {
    return [];
  }
  const response: ItemAndSupplierCodes[] = [];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].item.id != "nil") {
      response.push(body.data[i])
    }
  }
  return response;
}

export async function GetCodesByItem(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(
    `http://localhost:8080/api/v1/items/${id}/codes/`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      next: { tags: ["supplier-codes"] },
    }
  );

  const body = await res.json();
  if (body.code !== 200) {
    return [];
  }
  const response: SupplierCodeInfo[] = [];
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].supplier_code.id != "nil") {
      response.push(body.data[i])
    }
  }
  return response;
}
// export async function GetCodesByItem             // used in item/id pages to show supplier codes with related supplier name
