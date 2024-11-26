import { DefaultPageProps } from "@/app/lib/types/pageParams";
import HeaderItemCollection from "@/app/ui/modules/items/headers/HeaderItemCollection";
import ListItems from "@/app/ui/modules/items/lists/ListItems";
import { Locale } from "@/lib/dictionaries";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";

export default async function ItemsPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q);

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderItemCollection 
        locale={params.lang as Locale}
      />
      <ListItems 
        hideFilters={{}}
        searchParams={currentSearchParams.items}
        locale={params.lang as Locale}
        type="complete"
      />
    </>
  )
}
