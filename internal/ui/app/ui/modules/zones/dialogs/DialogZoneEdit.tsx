// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Zone } from "@/app/lib/types/data/zones";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  zone: Zone;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
  },
  dict: DictDialog;
}

export default function DialogZoneEdit({
  zone,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Zone"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Zone",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              button: fields.button
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
