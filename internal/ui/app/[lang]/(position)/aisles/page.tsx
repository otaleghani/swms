import { DefaultPageProps } from "@/app/lib/types/pageParams";
import ListAislesWithExtra from "@/app/ui/modules/aisles/lists/ListAislesWithExtra";
import { decodeSearchParams } from "@/app/lib/searchParams";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { defaultAislesBulkFormState } from "@/app/lib/types/data/aisles";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper";

export default async function AislesPage({
  params,
  searchParams
}: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);
  const currentSearchParams = decodeSearchParams(searchParams.q)
  const zones = await retrieve({
    request: "Zones",
    paginationOff: "true",
  });

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.aisle.header.title}
      />
  )}
  const HeaderWrapperRight = () => {
    return (
      <>
      <DialogFormPattern<"AislesBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict.aisle.dialogs.addBulk
        }}
        formPattern={{
          type: "AislesBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              zone: {
                name: "Zone",
                list: zones.data ? zones.data : [],
                dict: {...dict.form.fields.zones}
              },
              quantity: {dict: dict.form.fields.quantity},
              button: dict.form.buttons.add
            },
          },
          form: {
            formName: "AislesAddBulk",
            formAction: createFormAction,
            initialState: defaultAislesBulkFormState,
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
      <ListAislesWithExtra 
        locale={params.lang as Locale}
        searchParams={currentSearchParams.aisles}
      />
    </>
  )
}
