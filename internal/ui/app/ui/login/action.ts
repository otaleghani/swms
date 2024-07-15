"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type LoginFormState = {
  error: true | false,
  errorMessages: {
    email: string[];
    password: string[];
  }
  message?: string;
}

export async function loginAction(
  currentState: LoginFormState, 
  formData: FormData
) {
  const state: LoginFormState = { error: false, errorMessages: {email: [], password: []} }
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // EMAIL VALIDATION
  if (typeof data.email === "string") {
    if (data.email === "" || 
        data.email === undefined) {
      state.errorMessages.email.push(dict.login.form.errors.email.empty);
      state.error = true;
    }
    if (!data.email.includes("@") ||
        !data.email.includes(".")) {
      state.errorMessages.email.push(dict.login.form.errors.email.not_valid);
      state.error = true;
    }
  } else {
    state.errorMessages.email.push(dict.login.form.errors.email.type)
    state.error = true;
  }

  // PASSWORD VALIDATION
  if (typeof data.password === "string") {
    if (data.password === "" ||
        data.password === undefined) {
      state.errorMessages.email.push(dict.login.form.errors.email.empty);
      state.error = true;
    }
    if (data.password.length > 20) {
      state.errorMessages.password.push(dict.login.form.errors.password.max);
      state.error = true;
    }
    if (data.password.length < 8) {
      state.errorMessages.password.push(dict.login.form.errors.password.min);
      state.error = true;
    }
  } else {
    state.errorMessages.password.push(dict.login.form.errors.password.type)
    state.error = true;
  }

  if (!state.error) {
    const body = JSON.stringify({
      email: data.email,
      password: data.password
    })

    const res = await fetch("http://localhost:8080/api/v1/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
    const resBody = await res.json()

    if (resBody.code === 403) {
      state.message = dict.login.form.errors.general.auth;
      state.error = true;
    }
    if (resBody.code === 200) {
      state.error = false;
      state.message = dict.login.form.success

      cookies().set({
        name: "gennaro",
        value: resBody.data.accessToken,
        path: "/",
        httpOnly: true,
        sameSite: true,
      })
      cookies().set({
        name: "refresh_token",
        value: resBody.data.refreshToken,
        path: "/",
        httpOnly: true,
        sameSite: true,
      })
    }
    redirect("/")
  }

  return state
}
