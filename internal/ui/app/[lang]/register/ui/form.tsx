'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input"
import { Register } from "@/lib/login";

interface LoginFormProps {
  email_placeholder: string;
  password_placeholder: string;
}

export default function RegisterForm({ email_placeholder, password_placeholder }: LoginFormProps) {
  return (
    <>
      <form action={Register} className="flex flex-col gap-2 items-start" id="login-form">

        <Input 
          name="email"
          type="email" 
          placeholder={email_placeholder} />
        <Input 
          name="password"
          type="password" 
          placeholder={password_placeholder} />
        <Button className="mt-2" type="submit" form="login-form">Login</Button>
      </form>
    </>
  );
}
