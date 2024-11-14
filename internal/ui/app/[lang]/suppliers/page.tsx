// Actions
import { decodeSearchParams } from "@/app/lib/searchParams";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import ListSuppliersWithExtra from "@/app/ui/modules/suppliers/lists/ListSuppliersWithExtra";
import HeaderSupplierCollection from "@/app/ui/modules/suppliers/headers/HeaderSupplierCollection";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";

export default async function ZonesPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const currentSearchParams = decodeSearchParams(searchParams.q);

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderSupplierCollection locale={params.lang as Locale} />
      <ListSuppliersWithExtra
        locale={params.lang as Locale}
        searchParams={currentSearchParams.zones}
      />
    </>
  );
}
