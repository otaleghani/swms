import { retrieve } from "@/app/lib/requests/generics/retrieve"
import { Unit } from "@/app/lib/types/data/units";
import { Variants } from "@/app/lib/types/data/variants";
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";

export default async function ItemIdPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const item = retrieveById("Item", params.id ? params.id : "");

  const currentSearchParams = decodeSearchParams(searchParams.q)

  const variants = await retrieve({ request: "Variants", paginationOff: "true" });
  const units = await retrieve({
    request: "Units",
    paginationOff: "true"
  })

  return (
    <div>
      
    </div>
  )
}
