// Actions
import { getDictionary } from "@/lib/dictionaries";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Zone } from "@/app/lib/types/data/zones";

// Default values
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";

interface Props {
  locale: Locale;
  zone: Zone;
}

export default async function DialogZoneEdit({
  locale,
  zone,
}: Props) {
  const dict = await getDictionary(locale);

  return (
    <>
      <DialogFormPattern<"Zone"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict.zone.dialogs.edit
        }}
        formPattern={{
          type: "Zone",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: {dict: dict.form.fields.name},
              button: dict.form.buttons.add
            },
          },
          form: {
            formName: "updateZone" + zone.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultZoneFormState,
              result: {
                id: zone.id as string,
                name: zone.name as string,
              }
            }
          }
        }}
      />
    </>
  )
}
