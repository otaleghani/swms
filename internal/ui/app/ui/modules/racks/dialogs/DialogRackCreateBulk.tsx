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
import { defaultRacksBulkFormState } from "@/app/lib/types/data/racks";

interface Props {
  dict: DictDialog;
  fields: {
    quantity: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
  }
  relatedZone?: string;
  relatedAisle?: string;
}

export default function DialogRackCreateBulk({
  fields,
  dict,
  relatedZone,
  relatedAisle,
}: Props) {

  return (
    <>
      <DialogFormPattern<"RacksBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "RacksBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              zone: fields.zone,
              aisle: fields.aisle,
              quantity: fields.quantity,
              button: fields.button,
            },
          },
          form: {
            formName: "RackAddBulk",
            formAction: createFormAction,
            initialState: {
              ...defaultRacksBulkFormState,
              result: {
                quantity: 0,
                zone: relatedZone ? relatedZone : "",
                aisle: relatedAisle ? relatedAisle : "",
              }
            }
          }
        }}
      />
    </>
  )
}
