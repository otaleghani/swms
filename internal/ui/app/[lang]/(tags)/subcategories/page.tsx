// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve"
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction"
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction"
import { createFormAction } from "@/app/lib/actions/create/createFormAction"
import { decodeSearchParams } from "@/app/lib/searchParams"

// Components
import ListSubcategoriesWithExtra from "@/app/ui/modules/subcategories/lists/ListSubcategoriesWithExtra"
import HeaderSubcategoryCollection from "@/app/ui/modules/subcategories/headers/HeaderSubcategoryCollection"

// Types and interfaces
import { Locale } from "@/lib/dictionaries"
import { DefaultPageProps } from "@/app/lib/types/pageParams"

export default async function CategoriesPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q);
  const subcategoriesWithExtra = await retrieve({
    request: "SubcategoriesWithExtra",
    paginationOff: "true"
  });

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderSubcategoryCollection 
        locale={params.lang as Locale}
      />

      <ListSubcategoriesWithExtra 
        searchParams={currentSearchParams.categories}
        locale={params.lang as Locale}
        list={subcategoriesWithExtra}
      />
    </>
  )
}
