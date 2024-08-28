"use server";

import { cookies } from "next/headers";
import { Category } from "../../types";

export async function getCategories() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/categories/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["categories"] },
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
  return response as Category[];
}

export async function getCategoryById(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/categories/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["categories"] },
  })

  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return {} as Category;
  }

  return body.data as Category;
}

export async function getCategoryBySubcategory(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/subcategories/${id}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["categories"] },
  })
  const body = await res.json()

  if (body.code !== 200) {
    // error state?
    return {} as Category;
  }

  return body.data as Category;
}
