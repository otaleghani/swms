"use server";

import { cookies } from "next/headers";

interface ValidateDatabaseParameters {
  collection: "items" 
    | "users" 
    | "categories" 
    | "subcategories" 
    | "item-images" 
    | "zones" 
    | "aisles" 
    | "racks" 
    | "shelfs" 
    | "variants" 
    | "suppliers" 
    | "supplier-codes" 
    | "transitions" 
    | "products" 
    | "product-images" 
    | "clients" 
    | "ticket-states" 
    | "ticket-types" 
    | "tickets" 
  id: string;
  dict: any;
}

/** Validates if an item exists or not */
export default async function validateDatabase({
  collection,
  id,
  dict,
}: ValidateDatabaseParameters) {
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
  if (!jwt) {
    errors.push("anvedioh");
    return errors
  }

  const request = await 
    fetch(`http://localhost:8080/api/v1/${collection}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      next: { tags: ["items"] },
    }
  );
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
