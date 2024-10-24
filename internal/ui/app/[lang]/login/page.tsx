import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Link from "next/link";

export default async function LoginPage({ params }: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <section className="grid place-items-center w-full min-h-screen">
      <div className="xl:min-w-96 xl:w-96 min-w-full text-center p-4">
        <div className="">
          <h1 className="text-2xl font-semibold tracking-tight">{dict.register.title}</h1>
          <p className="pb-4 text-sm">{dict.register.description}</p>
        </div>
        <RegisterForm label={dict.register.form} lang={params.lang} />
        <p className="text-sm pt-4">{dict.register.footer} <Link className="underline" href="login">{dict.register.register}</Link></p>
      </div>
    </section>
  ) 
}
