import { Locale } from "@/lib/dictionaries";
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import ListAislesWithExtra from "@/app/ui/modules/aisles/lists/ListAislesWithExtra";
import { decodeSearchParams } from "@/app/lib/searchParams";

export default async function AislesPage({
  params,
  searchParams
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q)

  return (
    <>
      <ListAislesWithExtra 
        locale={params.lang as Locale}
        searchParams={currentSearchParams.aisles}
      />
    </>
  )
}
