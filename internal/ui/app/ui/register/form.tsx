"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input"

import { useActionState } from "react";
import { registerAction, State } from "@/lib/action";
// import { register } from "@/lib/action";
import { useFormState } from "react-dom";

interface RegisterFormProps {
  label: {
    email: string;
    password: string;
    button: string;
  }
}

// const initialState = { message: "", code: "" };
const initialState = 0

export default function RegisterForm({ label }: RegisterFormProps) {
  // useActionState does not work with "use server", it returns undefined everytime.
  const [state, formAction] = useActionState(registerAction, initialState);
  console.log(state)

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2 items-start" id="register-form">
        <Input 
          name="email"
          type="email" 
          placeholder={label.email} />
        <Input 
          name="password"
          type="password" 
          placeholder={label.password} />
        <Button className="mt-2 w-full" type="submit" form="register-form">{label.button}</Button>
      </form>
    </>
  );
}
