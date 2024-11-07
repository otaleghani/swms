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
import { defaultShelfsBulkFormState } from "@/app/lib/types/data/shelfs";

interface Props {
  dict: DictDialog;
  fields: {
    quantity: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
  }
  relatedZone?: string;
  relatedAisle?: string;
  relatedRack?: string;
}

export default function DialogShelfCreateBulk({
  fields,
  dict,
  relatedZone,
  relatedAisle,
  relatedRack,
}: Props) {

  return (
    <>
      <DialogFormPattern<"ShelfsBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "ShelfsBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              zone: fields.zone,
              aisle: fields.aisle,
              rack: fields.rack,
              quantity: fields.quantity,
              button: fields.button,
            },
          },
          form: {
            formName: "ShelfAddBulk",
            formAction: createFormAction,
            initialState: {
              ...defaultShelfsBulkFormState,
              result: {
                quantity: 0,
                zone: relatedZone ? relatedZone : "",
                aisle: relatedAisle ? relatedAisle : "",
                rack: relatedRack ? relatedRack : "",
              }
            }
          }
        }}
      />
    </>
  )
}
