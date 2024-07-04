import LoginForm from "./ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/card";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Link from "next/link";

interface LoginProps {
  params: {
    lang: string;
  }
}

export default async function Page({ params }: LoginProps) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <section className="grid items-center w-full min-h-screen">
      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>{dict.login.title}</CardTitle>
            <CardDescription>{dict.login.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm email_placeholder={dict.login.form.email} password_placeholder={dict.login.form.password} />
          </CardContent>
          <CardFooter>
            <p>{dict.login.footer} <Link className="underline" href="register">{dict.login.register}</Link></p>
          </CardFooter>
        </Card>
      </div>
    </section>
  ) 
}