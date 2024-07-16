"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GetItems() {
  const jwt = cookies().get("access")?.value;
  const res = await fetch('http://localhost:8080/api/v1/items/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  const body = await res.json();

  if (body.code === 401) {
    redirect("/login?error=403") 
  }

  if (body.code === 200) {
    return body.data
  }

  // error state
}
