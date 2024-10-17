import LoginForm from "@/app/ui/login/form";
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
    <section className="grid place-items-center w-full min-h-screen">
      <div className="xl:min-w-96 xl:w-96 min-w-full text-center p-4">
        <div className="">
          <h1 className="text-2xl font-semibold tracking-tight">{dict.login.title}</h1>
          <p className="pb-4 text-sm">{dict.login.description}</p>
        </div>
            <LoginForm label={dict.login.form} lang={params.lang} />
            <p className="text-sm pt-4">{dict.login.footer} <Link className="underline" href="register">{dict.login.register}</Link></p>
      </div>
    </section>
  ) 
}
