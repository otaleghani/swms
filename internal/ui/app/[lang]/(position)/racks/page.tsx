// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { decodeSearchParams } from "@/app/lib/searchParams";

// Components
import HeaderRackCollection from "@/app/ui/modules/racks/headers/HeaderRackCollection";
import ListRacksWithExtra from "@/app/ui/modules/racks/lists/ListRacksWithExtra";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { DefaultPageProps } from "@/app/lib/types/pageParams";

export default async function AislesPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q);

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderRackCollection locale={params.lang as Locale} />
      <ListRacksWithExtra 
        hideFilters={{}}
        searchParams={currentSearchParams.racks}
        locale={params.lang as Locale}
        type="complete"
        forceLayout="dynamic"
      />
    </>
  );
}
