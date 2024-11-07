// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Rack } from "@/app/lib/types/data/racks";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  rack: Rack;
  dict: DictDialog;
  fields: {
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
    button: DictFormButton;
  }
}

export default function DialogRackReplace({
  rack,
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
              id: rack.id as string,
              rack: fields.rack,
              aisle: fields.aisle,
              zone: fields.zone,
              button: fields.button
            },
          },
          form: {
            formName: "replaceRack" + rack.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: rack.id ? rack.id : "",
                itemThatReplaces: "",
                type: "Rack",
              },
            },
          },
        }}
      />
    </>
  )
}
