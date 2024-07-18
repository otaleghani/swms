'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getItems() {
  const jwt = cookies().get("access")?.value

  const res = await fetch('http://localhost:8080/api/v1/items/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  const response = await res.json()

  if (response.code === 401) {
    // const updateToken = await RefreshToken()
    // console.log(updateToken)
  }

  return response
}

export async function getItemsName() {
  const itemsData = getItems();
  const [items] = await Promise.all([itemsData]);
  const parsedData = [];
  if (items.data === undefined) {

    // redirect("/login")
    return []
  }
  for (let i = 0; i < items.data.length; i++) {
    parsedData.push(items.data[i].name as string)
  }
  return parsedData
}

export async function getCategory() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/categories/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  const body = await res.json()
  const response = []
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].id != "nil") {
      response.push(body.data[i])
    }
  }
  return response
}

export async function getSubcategory() {
  const jwt = cookies().get("access")?.value
  const res = await fetch("http://localhost:8080/api/v1/subcategories/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  const body = await res.json()
  const response = []
  for (let i = 0; i < body.data.length; i++) {
    if (body.data[i].id != "nil") {
      response.push(body.data[i])
    }
  }
  return response
}
