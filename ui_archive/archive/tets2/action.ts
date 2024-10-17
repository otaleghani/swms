"use server";

export type FormType = {
  message?: string;
  errors?: {};
  counter: number;
}

export async function bobDoSomething(currentState: FormType, formData: FormData) {
  console.log(currentState)

  return {
    message: "helo",
    errors: {},
    counter: currentState.counter + 1
  }
}
