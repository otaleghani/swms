/** Actions and defaults */
import { getDictionary, Locale } from "@/lib/dictionaries";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { defaultZonesBulkFormState, ZonesWithExtra } from "@/app/lib/types/data/zones";

/** Components */
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";

/** Types and interfaces */
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { decodeSearchParams } from "@/app/lib/searchParams";
import ListZonesWithExtra from "@/app/ui/modules/zones/lists/ListZonesWithExtra";

export default async function ZonesPage({ 
  params, 
  searchParams 
}: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);
  const currentSearchParams = decodeSearchParams(searchParams.q)

  return (
    <>
      <HeaderWrapper 
        Left={() => {
          return (
            <h1>{dict.zone.header.title}</h1>
          )
        }}
        Right={() => {
          return (
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
                    quantity: {
                      dict: dict.form.fields.quantity
                    },
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
          )
        }}
      />
      <ListZonesWithExtra 
        locale={params.lang as Locale}
        searchParams={currentSearchParams.zones}
      />
    </>
  )
}
