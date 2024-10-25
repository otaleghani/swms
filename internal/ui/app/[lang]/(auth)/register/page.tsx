import { DefaultPageProps } from "@/app/lib/types/pageParams";
import RegisterFo from "@/app/ui/modules/auth/LoginForm";
import RegisterForm from "@/app/ui/modules/auth/RegisterForm";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Link from "next/link";

export default async function LoginPage({ params }: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <section className="grid place-items-center w-full min-h-screen">
      <div className="xl:min-w-96 xl:w-96 min-w-full p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.pages.register.title}
          </h1>
          <p className="pb-4 text-sm">
            {dict.pages.register.description}
          </p>
        </div>

        <div>
          <RegisterForm
            fields={{
              email: dict.form.fields.email,
              password: dict.form.fields.password,
              name: dict.form.fields.name,
              surname: dict.form.fields.surname,
              button: dict.form.buttons.submit,
            }}
          />
        </div>

        <p className="text-sm pt-4">
          {dict.pages.register.footer.loginQuestion + " "} 
          <Link className="underline" href="/login">
            {dict.pages.register.footer.loginLink}
          </Link>
        </p>
      </div>
    </section>
  ) 
}
