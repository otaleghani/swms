"use server";

/** Next */
import { cookies } from "next/headers"

/** Types and interfaces */
import { Response } from "../../types/data/misc";

export type RequestAttributes = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  tag: string;
  payload?: any;
  headers?: Record<string, string>;
}

export default async function fetchData<Entity>(
  attributes: RequestAttributes
): Promise<Response<Entity>> {
  const { path, method = "GET", tag, payload, headers } = attributes;
  const jwt = cookies().get("access")?.value;

  if (!jwt) {
    return {
      code: 401,
      message: "Not authorized",
    } as Response<Entity>;
  }

  const apiPath = "http://localhost:8080/api/v1/";
  const endpoint = apiPath + path;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
      ...headers,
    },
    next: { tags: [tag] },
  };

  if (method !== "GET" && payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(endpoint, options);
  const responseBody = await response.json();

  if (!(typeof responseBody === "object" &&
    responseBody !== null &&
    typeof responseBody.code === "number"
  )) {
    return {
      code: 401,
      message: "Server error",
    } as Response<Entity>;
  }

  return responseBody as Response<Entity>;
}
