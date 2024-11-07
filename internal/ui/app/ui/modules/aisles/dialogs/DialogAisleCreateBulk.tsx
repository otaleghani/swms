// Actions
import { createFormAction } from "@/app/lib/actions/create/createFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultAislesBulkFormState } from "@/app/lib/types/data/aisles";

interface Props {
  dict: DictDialog;
  fields: {
    quantity: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
  }
  relatedZone?: string;
}

export default function DialogAisleCreateBulk({
  fields,
  dict,
  relatedZone,
}: Props) {

  return (
    <>
      <DialogFormPattern<"AislesBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "AislesBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              zone: fields.zone,
              quantity: fields.quantity,
              button: fields.button,
            },
          },
          form: {
            formName: "AisleAddBulk",
            formAction: createFormAction,
            initialState: {
              ...defaultAislesBulkFormState,
              result: {
                quantity: 0,
                zone: relatedZone ? relatedZone : "",
              }
            }
          }
        }}
      />
    </>
  )
}
