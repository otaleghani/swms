import Image from "next/image";
import { MainForm } from "@/app/ui/form";
import { getItemsName } from '@/lib/reqs';
import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";

interface HomeProps {
  params: {
    lang: string;
  }
}

export default async function Home({ params }: HomeProps ) {
  const dict = await getDictionary(params.lang as Locale);

  const data = getItemsName()
  const [ parsedData ] = await Promise.all([data])
  // if (parsedData.length === 0) {
  //   redirect("/login")
  // }

  return (
    <main className="px-96 py-40">
      <h1 className="text-2xl">{dict.home.title}</h1>
      <MainForm items={parsedData as string[]}/>
      <Image src={"/assets/next.svg"} width={50} height={50} alt=""/>
    </main>
  );
}
