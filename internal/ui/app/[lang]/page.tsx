import Image from "next/image";
import GetItems from "@/app/lib/items/get";
import { getDictionary, Locale } from "@/lib/dictionaries";
import AddItemForm from "../ui/general/form/items/add/form";
import { ComboboxForm } from "../ui/general/form/test-shad";
import TestForm from "../ui/general/form/test/form";

interface HomeProps {
  params: {
    lang: string;
  }
}

export default async function Home({ params }: HomeProps ) {
  const dict = await getDictionary(params.lang as Locale);

  const data = GetItems()
  const [ parsedData ] = await Promise.all([data])

  return (
    <main className="px-96 py-40">
      <h1 className="text-2xl">{dict.home.title}</h1>
      <Image src={"/assets/next.svg"} width={50} height={50} alt=""/>
      <TestForm data={parsedData}/>
    </main>
  );
}
