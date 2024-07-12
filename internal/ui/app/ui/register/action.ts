"use server";

import { z } from 'zod';

export type RegisterFormState = {
  result?: "success" | "error" | "pending" | null;
  message?: string;
  errors: {
    email?: string[] | null;
    password?: string[] | null;
  }
}

const RegisterFormSchema = z.object({
  email: z.string(),
  password: z.string()
    .min(19, {message: "Must be at least 8 characters long"})
    .max(20, {message: "Must be at most 20 characters long"})
    .includes("alberto", {message: "must include alberto"}),
});

const CreateUser = RegisterFormSchema;

export async function registerAction(
  currentState: RegisterFormState, 
  formData: FormData,
) {
  const state: RegisterFormState = { errors: {}}

  const validateFields = CreateUser.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })
  if (!validateFields.success) {
    return {
      result: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing field. Failed to Create Invoice.',
    };
  }
  return {
    result: "error",
    errors: {},
    message: 'Missing field. Failed to Create Invoice.',
  };


  // const data = {
  //   email: formData.get('email'),
  //   password: formData.get('password'),
  // }

  // if (data.email === "" || 
  //     data.email === undefined) {
  //   state.errors.email = "Email field must not be empty";
  //   state.hasErrors = true;
  // }

  // if (data.password === "") {
  //   state.errors.password = "Helo";
  //   state.hasErrors = true;
  // }

  // state.errors.password = "helo";
  // state.errors.email = "helo";


  // const body = JSON.stringify({
  //   email: data.email,
  //   password: data.password
  // })

  // const res = await fetch("http://localhost:8080/api/v1/users/", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: body,
  // })

  // const resBody = await res.json()
  // if (resBody.message === "Email already in use") {
  //   return {
  //     result: "error",
  //     hasErrors: true,
  //     errors: {
  //       email: resBody.message
  //     }
  //   }
  // }

  // console.log(resBody)
  // { code: 201, message: 'Item added' }
  // { code: 400, message: 'Email already in use' }
}
