"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input"
import FormError from "@/app/ui/_general/form-error";
import { Loader2 } from "lucide-react";

import { useActionState, useEffect, useState } from "react";
import { registerAction, RegisterFormState } from "@/app/ui/register/action";

interface RegisterFormProps {
  label: {
    email: string;
    password: string;
    button: string;
  }
}

export default function RegisterForm({ label }: RegisterFormProps) {
  const initialState: RegisterFormState = {errors: {}, message:"" }
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2 items-start" id="register-form">
        <div className="w-full text-left">
          <Input 
            className={`${state?.errors.email ? "border-red-500" : "border-black"}`}
            name="email"
            type="email" 
            required
            aria-describedby="email-error"
            placeholder={label.email} />
          <FormError 
            id="email-error" 
            description={state?.errors.email} />
        </div>
        <div className="w-full text-left">
          <Input 
            name="password"
            type="password" 
            maxLength={20}
            minLength={8}
            required
            placeholder={label.password} />
          <FormError 
            id="password-error" 
            description={state?.errors.password} />
        </div>
        <Button disabled={isPending} className="mt-2 w-full" type="submit" form="register-form">
          {isPending ? <><Loader2 className=" h-4 w-4 animate-spin" /> wait please</>
          : label.button}
        </Button>
      </form>
    </>
  );
}
