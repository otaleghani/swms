import Image from "next/image";
import { MainForm } from "@/app/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import { getItemsName } from '@/lib/reqs';
import { getDictionary, Locale } from "@/lib/dictionaries";

interface HomeProps {
  params: {
    lang: string;
  }
}

export default async function Home({ params }: HomeProps ) {
  const dict = await getDictionary(params.lang as Locale);

  const data = getItemsName()
  const [parsedData] = await Promise.all([data])

  return (
    <main className="px-96 py-40">
      <h1 className="text-2xl">{dict.home.title}</h1>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <MainForm items={parsedData}/>
      <Image src={"/assets/next.svg"} width={50} height={50} alt=""/>
    </main>
  );
}
