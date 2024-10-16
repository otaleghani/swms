/** Actions and defaults */
import { getDictionary, Locale } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { defaultZonesBulkFormState, ZonesWithExtra } from "@/app/lib/types/data/zones";

/** Components */
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";

/** Types and interfaces */
import { DefaultPageProps } from "@/app/lib/types/misc";
import ListZonesWithExtra from "@/app/ui/modules/zones/list/ListZonesWithExtra";

export default async function ZonePage({ params }: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);
  const pZonesWithExtra = retrieve("ZonesWithExtra");

  const [ zonesWithExtra ] = await Promise.all([pZonesWithExtra]);

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
        zonesWithExtra={zonesWithExtra.data as ZonesWithExtra}
      />
    </>
  )
}
