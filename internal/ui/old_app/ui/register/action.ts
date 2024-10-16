"use server";

import { getDictionary, Locale } from "@/lib/dictionaries";

export type RegisterFormState = {
  error: true | false,
  errorMessages: {
    email: string[];
    password: string[];
  }
  message?: string;
}

export async function registerAction(
  currentState: RegisterFormState, 
  formData: FormData,
) {
  const state: RegisterFormState = { error: false, errorMessages: {email: [], password: []} }

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    locale: formData.get("locale")
  }

  const dictPromise = getDictionary(data.locale as Locale)
  const [ dict ] = await Promise.all([ dictPromise ])

  // EMAIL VALIDATION
  if (typeof data.email === "string") {
    if (data.email === "" || 
        data.email === undefined) {
      state.errorMessages.email.push(dict.register.form.errors.email.empty);
      state.error = true;
    }
    if (!data.email.includes("@") ||
        !data.email.includes(".")) {
      state.errorMessages.email.push(dict.register.form.errors.email.not_valid);
      state.error = true;
    }
  } else {
    state.errorMessages.email.push(dict.register.form.errors.email.type)
    state.error = true;
  }

  // PASSWORD VALIDATION
  if (typeof data.password === "string") {
    if (data.password === "" ||
        data.password === undefined) {
      state.errorMessages.email.push(dict.register.form.errors.email.empty);
      state.error = true;
    }
    if (data.password.length > 20) {
      state.errorMessages.password.push(dict.register.form.errors.password.max);
      state.error = true;
    }
    if (data.password.length < 8) {
      state.errorMessages.password.push(dict.register.form.errors.password.min);
      state.error = true;
    }
  } else {
    state.errorMessages.password.push(dict.register.form.errors.password.type)
    state.error = true;
  }

  if (!state.error) {
    const body = JSON.stringify({
      email: data.email,
      password: data.password
    })

    const res = await fetch("http://localhost:8080/api/v1/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
    const resBody = await res.json()
    if (resBody.code === 400) {
      state.errorMessages.email.push(dict.register.form.errors.email.used);
      state.error = true;
    }
    if (resBody.code === 201) {
      state.error = false;
      state.message = dict.register.form.success
    }
  }

  return state
}
