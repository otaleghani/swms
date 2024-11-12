// Actions
import { notFound } from "next/navigation";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import ListRacksWithExtra from "@/app/ui/modules/racks/lists/ListRacksWithExtra"

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { Aisle, Aisles, AisleWithExtra } from "@/app/lib/types/data/aisles";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { Zones } from "@/app/lib/types/data/zones";
import HeaderRackSingle from "@/app/ui/modules/racks/headers/HeaderRackSingle";
import { Rack, RackWithExtra } from "@/app/lib/types/data/racks";
import HeroRackSingle from "@/app/ui/modules/racks/HeroRackSingle";
import ListShelfsWithExtra from "@/app/ui/modules/shelfs/lists/ListShelfsWithExtra";

export default async function RackIdPage({
  params,
  searchParams
}: DefaultPageProps) {

  const rack = await retrieveById("Rack", params.id ? params.id : "")
  const rackWithExtra = await retrieveById("RackWithExtra", params.id ? params.id : "")
  const zones = await retrieve({
    request: "Zones", 
    paginationOff: "true",
  })
  const aisles = await retrieve({
    request: "Aisles", 
    paginationOff: "true",
  })

  const currentSearchParams = decodeSearchParams(searchParams.q)
  const dict = await getDictionary(params.lang as Locale)

  if (rackWithExtra.code !== 200) {
    notFound();
  }

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderRackSingle 
        rack={rack.data as Rack}
        locale={params.lang as Locale}
      />

      <div className="grid xl:grid-cols-2">
        <div className="flex flex-col border-r xl:h-[calc(100vh_-_57px)]">
          <HeroRackSingle 
            item={rackWithExtra.data as RackWithExtra}
            dictCard={dict.rack.card}
            dictToast={dict.toasts.fetching}
            zonesList={zones.data as Zones}
            aislesList={aisles.data as Aisles}
          />
          <ListShelfsWithExtra 
            hideFilters={{ zones: true }}
            locale={params.lang as Locale}
            searchParams={currentSearchParams.shelfs}
            type="rack"
            rack={rack.data as Rack}
            forceLayout="list"
          />
        </div>
        <div className="xl:block hidden">sus</div>
      </div>
    </>
  )
}

