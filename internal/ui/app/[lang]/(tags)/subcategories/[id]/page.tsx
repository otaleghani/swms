// Actions
import { decodeSearchParams } from "@/app/lib/searchParams";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import HeaderSubcategorySingle from "@/app/ui/modules/subcategories/headers/HeaderSubcategorySingle";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { Categories, Category, CategoryWithExtra } from "@/app/lib/types/data/categories";
import { Subcategory, SubcategoryWithExtra } from "@/app/lib/types/data/subcategories";
import { getDictionary, Locale } from "@/lib/dictionaries";

import { notFound } from "next/navigation";
import HeroSubcategorySingle from "@/app/ui/modules/subcategories/HeroSubcategorySingle";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

export default async function CategoryIdPage({
  params,
  searchParams
}: DefaultPageProps) {

  const subcategory = await retrieveById("Subcategory", params.id ? params.id : "")
  const subcategoryWithExtra = await retrieveById("SubcategoryWithExtra", params.id ? params.id : "")
  const categories = await retrieve({
    request: "Categories",
    paginationOff: "true"
  });

  const currentSearchParams = decodeSearchParams(searchParams.q)
  const dict = await getDictionary(params.lang as Locale)

  if (subcategoryWithExtra.code !== 200) {
    notFound();
  }

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderSubcategorySingle
        subcategory={subcategory.data as Subcategory}
        locale={params.lang as Locale}
      />
      <div className="grid xl:grid-cols-2">
        <div className="flex flex-col border-r xl:h-[calc(100vh_-_57px)]">
          <HeroSubcategorySingle
            item={subcategoryWithExtra.data as SubcategoryWithExtra}
            dictCard={dict.subcategory.card}
            dictToast={dict.toasts.fetching}
            categoriesList={categories.data as Categories}
          />
        </div>
        <div className="xl:block hidden">sus</div>
      </div>
    </>
  )
}

