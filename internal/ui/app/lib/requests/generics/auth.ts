"use server";

// Types and interfaces
import { LoginRequestBody, LoginResponseBody, RegisterRequestBody } from "../../types/data/auth";

// Action
import fetchData from "../fetch";

export async function login(payload: LoginRequestBody) {
  const response = await fetchData<LoginResponseBody>({
    path: "login/",
    method: "POST",
    tag: "Users",
    payload: payload,
  });

  return response;
};

export async function register(payload: RegisterRequestBody) {
  const response = await fetchData<undefined>({
    path: "users/",
    method: "POST",
    tag: "Users",
    payload: payload,
  });

  return response;
}
