import RegisterForm from "@/app/ui/register/form";
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
    <section className="grid place-items-center w-full min-h-screen">
      <div className="xl:min-w-96 min-w-full text-center p-4">
        <div className="">
          <h1 className="text-2xl font-semibold tracking-tight">{dict.register.title}</h1>
          <p className="pb-4 text-sm">{dict.register.description}</p>
        </div>
            <RegisterForm label={dict.register.form} />
            <p className="text-sm pt-4">{dict.register.footer} <Link className="underline" href="login">{dict.register.register}</Link></p>
      </div>
    </section>
  ) 
}
