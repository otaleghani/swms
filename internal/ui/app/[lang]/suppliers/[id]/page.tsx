// Actions
import { decodeSearchParams } from "@/app/lib/searchParams";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import HeaderSupplierSingle from "@/app/ui/modules/suppliers/headers/HeaderSupplierSingle";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { Supplier, SupplierWithExtra } from "@/app/lib/types/data/suppliers";
import { getDictionary, Locale } from "@/lib/dictionaries";
//import ListAislesWithExtra from "@/app/ui/modules/aisles/lists/ListAislesWithExtra";
import HeroSupplierSingle from "@/app/ui/modules/suppliers/HeroSupplierSingle";
import { notFound } from "next/navigation";
import ListSupplierCodes from "@/app/ui/modules/supplierCodes/lists/ListSupplierCodes";

export default async function SuppliersIdPage({
  params,
  searchParams
}: DefaultPageProps) {
  const supplier = await retrieveById("Supplier", params.id ? params.id : "")
  const supplierWithExtra = await retrieveById("SupplierWithExtra", params.id ? params.id : "")

  const currentSearchParams = decodeSearchParams(searchParams.q)
  const dict = await getDictionary(params.lang as Locale)

  if (supplierWithExtra.code !== 200) {
    notFound();
  }

  const replace = replaceFormAction;
  const update = updateFormAction;
  const create = createFormAction;

  return (
    <>
      <HeaderSupplierSingle 
        supplier={supplier.data as Supplier}
        locale={params.lang as Locale}
      />
      <div className="">
        <div className="flex flex-col border-r xl:h-[calc(100vh_-_57px)]">
          <HeroSupplierSingle 
            item={supplierWithExtra.data as SupplierWithExtra}
            dictCard={dict.supplier.card}
            dictToast={dict.toasts.fetching}
          />
          <ListSupplierCodes 
            hideFilters={{supplier: true}}
            searchParams={currentSearchParams.supplierCodes}
            locale={params.lang as Locale}
            type={"supplier"}
            supplier={supplier.data as Supplier}
            forceLayout={"list"}
          />
        </div>
      </div>
    </>
  )
}

