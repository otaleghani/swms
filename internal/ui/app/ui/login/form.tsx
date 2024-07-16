'use client';

import { useActionState } from "react";
import { LoginFormState, loginAction } from "@/app/ui/login/action";

import { Button } from "@/components/button";
import { Input } from "@/components/input"
import { Loader2 } from "lucide-react";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { useSearchParams } from "next/navigation";

interface LoginFormProps {
  label: {
    email: string;
    password: string;
    button: string;
    pending: string;
    invalid_token: string;
  };
  lang: string;
}

export default function LoginForm({ label, lang }: LoginFormProps) {
  const error = useSearchParams().get("error") ? label.invalid_token : undefined

  const initialState: LoginFormState = {
    error: error ? true : false, 
    errorMessages: {
      email: [],
      password: [],
    },
    message: error,
  }
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2 items-start" id="login-form">
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
          description={state.errorMessages.email} />
        <Input 
          className={`${state.errorMessages.email.length != 0 
          ? "border-red-500" 
          : ""}`}
          name="password"
          type="password" 
          placeholder={label.password} />
        <FormFieldError 
          id="email-error" 
          description={state.errorMessages.password} />
        <Button disabled={isPending} className="mt-2 w-full" type="submit" form="login-form">
          {isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{label.pending}</>
          : label.button}
        </Button>
        {state.error ? (
          <FormError 
            message={state.message!} />
        ) 
        : (
          <FormSuccess message={state.message!} />
        )}
      </form>
    </>
  );
}
