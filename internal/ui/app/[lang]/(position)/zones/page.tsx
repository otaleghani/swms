// Default states
import { defaultZonesBulkFormState } from "@/app/lib/types/data/zones";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";

// Actions
import { getDictionary, Locale } from "@/lib/dictionaries";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import ListZonesWithExtra from "@/app/ui/modules/zones/lists/ListZonesWithExtra";
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

export default async function ZonesPage({ 
  params, 
  searchParams 
}: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);
  const currentSearchParams = decodeSearchParams(searchParams.q)

  const zonesWithExtra = await retrieve({
    request: "ZonesWithExtra",
    page: currentSearchParams?.zones?.pagination?.page,
    perPage: currentSearchParams?.zones?.pagination?.perPage,
    filters: JSON.stringify(currentSearchParams?.zones?.filters),
  });
  const zones = await retrieve({request: "Zones"});
  const replace = replaceFormAction
  const update = updateFormAction

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.zone.header.title}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
      <DialogFormPattern<"ZonesBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict.zone.dialogs.addBulk
        }}
        formPattern={{
          type: "ZonesBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              quantity: {dict: dict.form.fields.quantity},
              button: dict.form.buttons.add
            },
          },
          form: {
            formName: "ZoneAddBulk",
            formAction: createFormAction,
            initialState: defaultZonesBulkFormState,
          }
        }}
      />
      </>
    )
  }

  return (
    <>
      <HeaderWrapper 
        Left={HeaderWrapperLeft}
        Right={HeaderWrapperRight}
      />

      <ListZonesWithExtra 
        locale={params.lang as Locale}
        searchParams={currentSearchParams.zones}
      />
    </>
  )
}

