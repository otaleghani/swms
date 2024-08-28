"use server";

import { cookies } from "next/headers";

export async function deleteCategory(id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
  })
  const body = await res.json()
}

export async function deleteCategorySubstitution(id: string, sub_id: string) {
  const jwt = cookies().get("access")?.value
  const res = await fetch(`http://localhost:8080/api/v1/categories/${id}/replace-with/${sub_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
  })
  const resBody = await res.json();
  return resBody;
}
