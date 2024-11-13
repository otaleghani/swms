// Actions
import { notFound } from "next/navigation";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import ListRacksWithExtra from "@/app/ui/modules/racks/lists/ListRacksWithExtra"

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";

import { Zones } from "@/app/lib/types/data/zones";
import { Aisles } from "@/app/lib/types/data/aisles";
import { Racks } from "@/app/lib/types/data/racks";
import { Shelf, ShelfWithExtra } from "@/app/lib/types/data/shelfs";

import { getDictionary, Locale } from "@/lib/dictionaries";
import HeaderShelfSingle from "@/app/ui/modules/shelfs/headers/HeaderShelfSingle";
import HeroShelfSingle from "@/app/ui/modules/shelfs/HeroShelfSingle";

export default async function ShelfIdPage({
  params,
  searchParams
}: DefaultPageProps) {

  const shelf = await retrieveById("Shelf", params.id ? params.id : "")
  const shelfWithExtra = await retrieveById("ShelfWithExtra", params.id ? params.id : "")
  const zones = await retrieve({
    request: "Zones", 
    paginationOff: "true",
  })
  const aisles = await retrieve({
    request: "Aisles", 
    paginationOff: "true",
  })
  const racks = await retrieve({
    request: "Racks", 
    paginationOff: "true",
  })

  const currentSearchParams = decodeSearchParams(searchParams.q)
  const dict = await getDictionary(params.lang as Locale)

  if (shelfWithExtra.code !== 200) {
    notFound();
  }

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderShelfSingle 
        shelf={shelf.data as Shelf}
        locale={params.lang as Locale}
      />

      <div className="grid xl:grid-cols-2">
        <div className="flex flex-col border-r xl:h-[calc(100vh_-_57px)]">
          <HeroShelfSingle 
            item={shelfWithExtra.data as ShelfWithExtra}
            dictCard={dict.shelf.card}
            dictToast={dict.toasts.fetching}
            zonesList={zones.data as Zones}
            aislesList={aisles.data as Aisles}
            racksList={racks.data as Racks}
          />
        </div>
        <div className="xl:block hidden">sus</div>
      </div>
    </>
  )
}

