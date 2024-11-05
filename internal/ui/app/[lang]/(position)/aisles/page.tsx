// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { decodeSearchParams } from "@/app/lib/searchParams";


// Components
import HeaderAisleCollection from "@/app/ui/modules/aisles/headers/HeaderAisleCollection";
import ListAislesWithExtra from "@/app/ui/modules/aisles/lists/ListAislesWithExtra";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { DefaultPageProps } from "@/app/lib/types/pageParams";

export default async function AislesPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q);

  const aislesWithExtra = await retrieve({
    request: "AislesWithExtra",
    page: currentSearchParams.aisles?.pagination?.page,
    perPage: currentSearchParams.aisles?.pagination?.perPage,
    filters: JSON.stringify(currentSearchParams.aisles?.filters),
  });
  
  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderAisleCollection locale={params.lang as Locale} />
      <ListAislesWithExtra
        locale={params.lang as Locale}
        searchParams={currentSearchParams.aisles}
        list={aislesWithExtra}
      />
    </>
  );
}
