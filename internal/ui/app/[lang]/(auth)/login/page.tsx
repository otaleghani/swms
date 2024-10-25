import { DefaultPageProps } from "@/app/lib/types/pageParams";
import LoginForm from "@/app/ui/modules/auth/LoginForm";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Link from "next/link";

export default async function LoginPage({ params }: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <section className="grid place-items-center w-full min-h-screen">
      <div className="xl:min-w-96 xl:w-96 min-w-full p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.pages.login.title}
          </h1>
          <p className="pb-4 text-sm">
            {dict.pages.login.description}
          </p>
        </div>

        <div>
          <LoginForm 
            fields={{
              email: dict.form.fields.email,
              password: dict.form.fields.password,
              button: dict.form.buttons.submit,
            }}
            dictErrors={dict.pages.login.error}
          />
        </div>

        <p className="text-sm pt-4">
          {dict.pages.login.footer.registerQuestion + " "} 
          <Link className="underline" href="/register">
            {dict.pages.login.footer.registerLink}
          </Link>
        </p>
      </div>
    </section>
  ) 
}
