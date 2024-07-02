import LoginForm from "./ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/card";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Link from "next/link";

interface RegisterProps {
  params: {
    lang: string;
  }
}

export default async function Page({ params }: RegisterProps) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <section className="grid items-center w-full min-h-screen">
      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>{dict.register.title}</CardTitle>
            <CardDescription>{dict.register.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm email_placeholder={dict.register.form.email} password_placeholder={dict.register.form.password} />
          </CardContent>
          <CardFooter>
            <p>{dict.register.footer} <Link className="underline" href="login">{dict.register.register}</Link></p>
          </CardFooter>
        </Card>
      </div>
    </section>
  ) 
}
