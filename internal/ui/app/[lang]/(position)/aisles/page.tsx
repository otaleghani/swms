// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
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

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderAisleCollection locale={params.lang as Locale} />
      <ListAislesWithExtra
        hideFilters={{}}
        searchParams={currentSearchParams.aisles}
        locale={params.lang as Locale}
        type="complete"
        forceLayout="dynamic"
      />
    </>
  );
}
