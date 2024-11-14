import { retrieve } from "@/app/lib/requests/generics/retrieve"
import { DefaultPageProps } from "@/app/lib/types/pageParams"
import HeaderCategoryCollection from "@/app/ui/modules/categories/headers/HeaderCategoryCollection"
import { Locale } from "@/lib/dictionaries"
import { decodeSearchParams } from "@/app/lib/searchParams"
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction"
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction"
import { createFormAction } from "@/app/lib/actions/create/createFormAction"
import ListCategoriesWithExtra from "@/app/ui/modules/categories/lists/ListCategoriesWithExtra"

export default async function CategoriesPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q);

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderCategoryCollection 
        locale={params.lang as Locale}
      />

      <ListCategoriesWithExtra 
        searchParams={currentSearchParams.categories}
        locale={params.lang as Locale}
      />
    </>
  )
}
