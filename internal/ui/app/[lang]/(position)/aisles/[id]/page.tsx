// Actions
import { notFound } from "next/navigation";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import HeaderAisleSingle from "@/app/ui/modules/aisles/headers/HeaderAisleSingle";
import ListRacksWithExtra from "@/app/ui/modules/racks/lists/ListRacksWithExtra"
import HeroAisleSingle from "@/app/ui/modules/aisles/HeroAisleSingle";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { Aisle, AisleWithExtra } from "@/app/lib/types/data/aisles";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { Zones } from "@/app/lib/types/data/zones";

export default async function AisleIdPage({
  params,
  searchParams
}: DefaultPageProps) {

  const aisle = await retrieveById("Aisle", params.id ? params.id : "")
  const aisleWithExtra = await retrieveById("AisleWithExtra", params.id ? params.id : "")
  const zones = await retrieve({
    request: "Zones", 
    paginationOff: "true",
  })

  const currentSearchParams = decodeSearchParams(searchParams.q)
  const dict = await getDictionary(params.lang as Locale)

  if (aisleWithExtra.code !== 200) {
    notFound();
  }

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderAisleSingle 
        aisle={aisle.data as Aisle}
        locale={params.lang as Locale}
      />
      <div className="grid xl:grid-cols-2">
        <div className="flex flex-col border-r xl:h-[calc(100vh_-_57px)]">
          <HeroAisleSingle 
            item={aisleWithExtra.data as AisleWithExtra}
            dictCard={dict.aisle.card}
            dictToast={dict.toasts.fetching}
            zonesList={zones.data as Zones}
          />
          <ListRacksWithExtra 
            hideFilters={{ zones: true }}
            locale={params.lang as Locale}
            searchParams={currentSearchParams.aisles}
            type="aisle"
            aisle={aisle.data as Aisle}
            forceLayout="list"
          />
        </div>
        <div className="xl:block hidden">sus</div>
      </div>
    </>
  )
}

