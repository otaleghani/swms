// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Shelf } from "@/app/lib/types/data/shelfs";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  shelf: Shelf;
  dict: DictDialog;
  fields: {
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
    shelf: SelectFieldProps<"Shelf">;
    button: DictFormButton;
  }
}

export default function DialogShelfReplace({
  shelf,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Replace">
        showButton
        self={{
          triggerType: "iconDelete",
          dict: dict,
        }}
        formPattern={{
          type: "Replace",
          self: {
            fields: {
              ...fieldsDefaultProps,
              id: shelf.id as string,
              shelf: fields.shelf,
              aisle: fields.aisle,
              rack: fields.rack,
              zone: fields.zone,
              button: fields.button
            },
          },
          form: {
            formName: "replaceShelf" + shelf.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: shelf.id ? shelf.id : "",
                itemThatReplaces: "",
                type: "Shelf",
              },
            },
          },
        }}
      />
    </>
  )
}
