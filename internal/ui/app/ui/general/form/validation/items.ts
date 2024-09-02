"use server";

import { cookies } from "next/headers";

export default async function validateItem(
  id: string,
  dict: any,
) {
  const errors: string[] = [];

  if (typeof id === "string") {
    errors.push(dict.error.request);
    return errors;
  }

  if (id === "" || id === undefined) {
    errors.push(dict.error.request);
    return errors;
  }

  const jwt = cookies().get("access")?.value
  const request = await fetch(`http://localhost:8080/api/v1/items/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    next: { tags: ["items"] },
  });
  const response = await request.json();

  if (response.code === undefined) {
    errors.push(dict.error.request);
    return errors;
  }

  if (response.code === 200) {
    return [];
  }

  if (response.code === 401) {
    errors.push(dict.error.auth);
    return errors;
  }

  if (response.code === 404) {
    errors.push(dict.error.not_found);
    return errors;
  }

  if (response.code === 400) {
    errors.push(dict.error.request);
    return errors;
  }

  if (response.code === 500) {
    errors.push(dict.error.server);
    return errors;
  }

  errors.push(dict.error.unknown);
  return errors;
}
