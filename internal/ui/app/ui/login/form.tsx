'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input"
import { Login } from "@/lib/login";

interface LoginFormProps {
  label: {
    email: string;
    password: string;
    button: string;
  }
}

export default function LoginForm({ label }: LoginFormProps) {
  return (
    <>
      <form action={Login} className="flex flex-col gap-2 items-start" id="login-form">
        <Input 
          name="email"
          type="email" 
          placeholder={label.email} />
        <Input 
          name="password"
          type="password" 
          placeholder={label.password} />
        <Button className="mt-2 w-full" type="submit" form="login-form">{label.button}</Button>
      </form>
    </>
  );
}
