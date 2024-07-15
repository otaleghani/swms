"use server";

import { cookies } from "next/headers";

export async function getItems() {
  const jwt = cookies().get("gennaro")?.value

  const res = await fetch('http://localhost:8080/api/v1/items/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  const response = await res.json()

  if (response.code === 401) {
    const refresh = cookies().get("refresh_token")?.value
    const body = JSON.stringify({refreshToken: refresh});
    const resRefresh = await fetch('http://localhost:8080/api/v1/refresh/', {
      method: 'POST',
      headers: {
        //'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: body,
    });
    const resRefreshBody = await resRefresh.json()
    console.log(resRefreshBody)
    if (resRefreshBody.code = 200) {
      cookies().delete("gennaro")
      cookies().set({
        name: "gennaro",
        value: resRefreshBody.data.accessToken,
        path: "/",
        httpOnly: true,
        sameSite: true,
      })
    } else {
      console.log("GOT PROBLEM")
    }
  }

  return response
}

export async function getItemsName() {
  const itemsData = getItems();
  const [items] = await Promise.all([itemsData]);
  const parsedData = [];
  for (let i = 0; i < items.data.length; i++) {
    parsedData.push(items.data[i].name as string)
  }
  return parsedData
}
