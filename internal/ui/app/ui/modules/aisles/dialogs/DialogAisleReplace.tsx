// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Aisle } from "@/app/lib/types/data/aisles";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  aisle: Aisle;
  dict: DictDialog;
  fields: {
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    button: DictFormButton;
  }
}

export default function DialogAisleReplace({
  aisle,
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
              id: aisle.id as string,
              aisle: fields.aisle,
              zone: fields.zone,
              button: fields.button
            },
          },
          form: {
            formName: "replaceAisle" + aisle.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: aisle.id ? aisle.id : "",
                itemThatReplaces: "",
                type: "Aisle",
              },
            },
          },
        }}
      />
    </>
  )
}