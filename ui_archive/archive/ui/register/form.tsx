"use client";

import { useActionState } from "react";
import { registerAction, RegisterFormState } from "@/app/ui/register/action";

import { Button } from "@/components/button";
import { Input } from "@/components/input"
import FormFieldError from "@/app/ui/general/form/error_field";
import FormSuccess from "@/app/ui/general/form/success";
import { Loader2 } from "lucide-react";


interface RegisterFormProps {
  label: {
    email: string;
    password: string;
    button: string;
    pending: string;
  };
  lang: string;
}

export default function RegisterForm({ label, lang }: RegisterFormProps) {
  const initialState: RegisterFormState = {
    error: false, 
    errorMessages: {
      email: [],
      password: [],
  }}
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2 items-start" id="register-form">
        <div className="w-full text-left">
          <input type="hidden" name="locale" value={lang} />
          <Input 
            className={`${state.errorMessages.email.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="email"
            type="email" 
            required
            aria-describedby="email-error"
            placeholder={label.email} />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.email!} />
        </div>
        <div className="w-full text-left">
          <Input 
            className={`
            ${state.errorMessages.password.length != 0
            ? "border-red-500"
            : ""}`}
            name="password"
            type="password" 
            maxLength={20}
            minLength={8}
            required
            placeholder={label.password} />
          <FormFieldError 
            id="password-error" 
            description={state.errorMessages.password!} />
        </div>
        <Button disabled={isPending} className="mt-2 w-full" type="submit" form="register-form">
          {isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{label.pending}</>
          : label.button}
        </Button>
        <FormSuccess message={state.message!} />
      </form>
    </>
  );
}
