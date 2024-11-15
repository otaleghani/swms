import { DefaultPageProps } from "@/app/lib/types/pageParams";
import FormAddItem from "@/app/ui/modules/items/FormAddItem";

import { Locale } from "@/lib/dictionaries";
export default async function ItemAddPage({
  params,
  searchParams,
}: DefaultPageProps) {

  return (
    <>
      <FormAddItem locale={params.lang as Locale} />
    </>
  )
}
