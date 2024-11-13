// Actions
import { decodeSearchParams } from "@/app/lib/searchParams";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import HeaderCategorySingle from "@/app/ui/modules/categories/headers/HeaderCategorySingle";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { Category, CategoryWithExtra } from "@/app/lib/types/data/categories";
import { Subcategories } from "@/app/lib/types/data/subcategories";
import { getDictionary, Locale } from "@/lib/dictionaries";
import ListSubcategoriesWithExtra from "@/app/ui/modules/subcategories/lists/ListSubcategoriesWithExtra";

import { notFound } from "next/navigation";

export default async function CategoryIdPage({
  params,
  searchParams
}: DefaultPageProps) {

  const zone = await retrieveById("Zone", params.id ? params.id : "")
  const zoneWithExtra = await retrieveById("ZoneWithExtra", params.id ? params.id : "")

  const currentSearchParams = decodeSearchParams(searchParams.q)
  const dict = await getDictionary(params.lang as Locale)

  if (zoneWithExtra.code !== 200) {
    notFound();
  }

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderZoneSingle 
        zone={zone.data as Zone}
        locale={params.lang as Locale}
      />
      <div className="grid xl:grid-cols-2">
        <div className="flex flex-col border-r xl:h-[calc(100vh_-_57px)]">
          <HeroZoneSingle 
            item={zoneWithExtra.data as ZoneWithExtra}
            dictCard={dict.zone.card}
            dictToast={dict.toasts.fetching}
          />
          <ListAislesWithExtra 
            hideFilters={{ zones: true }}
            locale={params.lang as Locale}
            searchParams={currentSearchParams.aisles}
            type="zone"
            zone={zone.data as Zone}
            forceLayout="list"
          />
        </div>
        <div className="xl:block hidden">sus</div>
      </div>
    </>
  )
}

