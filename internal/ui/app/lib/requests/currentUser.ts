"use server";

import fetchData from "./fetch";
import { User } from "../types/data/users";

export default async function getCurrentUser() {
  const response = await fetchData<User>({
    path: "users/current/",
    method: "GET",
    tag: "CurrentUser",
  });
  return response
}
