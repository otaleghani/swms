import { DefaultPageProps } from "@/app/lib/types/pageParams";
import FormAddItem from "@/app/ui/modules/items/FormAddItem";
import HeaderItemAdd from "@/app/ui/modules/items/headers/HeaderItemAdd";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction"
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction"
import { createFormAction } from "@/app/lib/actions/create/createFormAction"

import { Locale } from "@/lib/dictionaries";
export default async function ItemAddPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderItemAdd locale={params.lang as Locale} />
      <FormAddItem locale={params.lang as Locale} />
    </>
  )
}
