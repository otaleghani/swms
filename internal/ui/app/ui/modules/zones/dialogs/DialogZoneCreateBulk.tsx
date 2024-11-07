// Actions
import { createFormAction } from "@/app/lib/actions/create/createFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps } from "@/app/lib/types/form/fields";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultZonesBulkFormState } from "@/app/lib/types/data/zones";

interface Props {
  dict: DictDialog;
  fields: {
    quantity: InputFieldProps;
    button: DictFormButton;
  }
}

export default function DialogZoneCreateBulk({
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"ZonesBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "ZonesBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              quantity: fields.quantity,
              button: fields.button,
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
