import { MainForm } from "@/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getItemsName } from '@/lib/reqs';

export default async function Home() {
  const data = getItemsName()
  const [parsedData] = await Promise.all([data])

  return (
    <main className="px-96 py-40">
      <h1 className="text-2xl">Test for the thing</h1>
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
    </main>
  );
}
