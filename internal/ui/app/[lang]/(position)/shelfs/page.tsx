// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { decodeSearchParams } from "@/app/lib/searchParams";

// Components
import HeaderShelfCollection from "@/app/ui/modules/shelfs/headers/HeaderShelfCollection";
import ListShelfsWithExtra from "@/app/ui/modules/shelfs/lists/ListShelfsWithExtra";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { DefaultPageProps } from "@/app/lib/types/pageParams";

export default async function ShelfsPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q);

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderShelfCollection locale={params.lang as Locale} />
      <ListShelfsWithExtra 
        hideFilters={{}}
        searchParams={currentSearchParams.racks}
        locale={params.lang as Locale}
        type="complete"
        forceLayout="dynamic"
      />
    </>
  );
}
