// Actions
import { decodeSearchParams } from "@/app/lib/searchParams";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import ListZonesWithExtra from "@/app/ui/modules/zones/lists/ListZonesWithExtra";
import HeaderZoneCollection from "@/app/ui/modules/zones/headers/HeaderZoneCollection";

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
      <HeaderZoneCollection locale={params.lang as Locale} />
      <ListZonesWithExtra
        locale={params.lang as Locale}
        searchParams={currentSearchParams.zones}
      />
    </>
  );
}
