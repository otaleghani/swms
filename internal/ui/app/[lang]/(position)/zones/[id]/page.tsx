// Default states

// Actions
import { getDictionary } from "@/lib/dictionaries";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";

// Components
import HeaderZoneSingle from "@/app/ui/modules/zones/headers/HeaderZoneSingle";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { Zone } from "@/app/lib/types/data/zones";
import { Locale } from "@/lib/dictionaries";
import ListAislesWithExtra from "@/app/ui/modules/aisles/lists/ListAislesWithExtra";

export default async function ZonesIdPage({
  params,
  searchParams
}: DefaultPageProps) {
  const zone = await retrieveById("Zone", params.id ? params.id : "")
  const dict = await getDictionary(params.lang as Locale);
  const currentSearchParams = decodeSearchParams(searchParams.q)

  const aislesWithExtra = await retrieveByForeignId({
    request: "AislesWithExtra",
    foreign: "Zone",
    id: zone.data?.id as string,
    page: currentSearchParams.zones?.pagination?.page,
    perPage: currentSearchParams.zones?.pagination?.perPage,
    filters: JSON.stringify(currentSearchParams.zones?.filters),
  });

  return (
    <>
      <HeaderZoneSingle 
        zone={zone.data as Zone}
        locale={params.lang as Locale}
      />
      <ListAislesWithExtra 
        locale={params.lang as Locale}
        list={aislesWithExtra}
      />
    </>
  )
}

