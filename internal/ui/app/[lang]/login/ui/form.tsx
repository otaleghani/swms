'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input"

export default function LoginForm() {
  return (
    <>
      <form action={""} className="flex flex-col gap-2 items-start" id="login-form">
        <Input type="email" placeholder="Email" />
        <Input type="email" placeholder="Email" />
        <Button type="submit" form="login-form">Login</Button>
        // THINK ABOUT INTERNATIONALIZATION!!!
      </form>
    </>
  );
}
