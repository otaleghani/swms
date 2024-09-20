import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import { dateToISOString, dateToLocaleDateString, dateToLocaleString, dateToLocaleTimeString } from "@/app/lib/validation/dates";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  const stringDate = "2024-08-15";
  console.log(dateToISOString(stringDate))

  return (
    <main>
    </main>
  )
}
