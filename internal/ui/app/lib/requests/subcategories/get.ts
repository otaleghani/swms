"use server";

import { cookies } from "next/headers";
import { Subcategory } from "../../types";

export async function getSubcategories() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/subcategories/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["subcategories"] },
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
  return response as Subcategory[];
}

export async function getSubcategoryById(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/subcategories/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["subcategories"] },
  })

  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return {} as Subcategory;
  }

  return body.data as Subcategory;
}

export async function getSubcategoriesByCategory(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/categories/${id}/subcategories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["subcategories"] },
  })

  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return [] as Subcategory[];
  }

  console.log(body.data)

  return body.data as Subcategory[];
}
