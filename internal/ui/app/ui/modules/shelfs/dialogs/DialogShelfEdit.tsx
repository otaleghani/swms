// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Shelf } from "@/app/lib/types/data/shelfs";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultShelfFormState } from "@/app/lib/types/data/shelfs";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  shelf: Shelf;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
  },
  dict: DictDialog;
}

export default function DialogShelfEdit({
  shelf,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Shelf"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Shelf",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              zone: fields.zone,
              aisle: fields.aisle,
              rack: fields.rack,
              button: fields.button
            },
          },
          form: {
            formName: "updateShelf" + shelf.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultShelfFormState,
              result: {
                id: shelf.id as string,
                zone: shelf.zone as string,
                aisle: shelf.aisle as string,
                rack: shelf.rack as string,
                name: shelf.name as string,
              }
            }
          }
        }}
      />
    </>
  )
}
