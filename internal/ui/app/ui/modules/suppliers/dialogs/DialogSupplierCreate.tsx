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
import { defaultSupplierFormState } from "@/app/lib/types/data/suppliers";

interface Props {
  dict: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
  }
  xSmall?: boolean;
}

export default function DialogSupplierCreate({
  fields,
  dict,
  xSmall
}: Props) {

  return (
    <>
      <DialogFormPattern<"Supplier"> 
        xSmall={xSmall}
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "Supplier",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              description: fields.description,
              button: fields.button,
            },
          },
          form: {
            formName: "Supplier",
            formAction: createFormAction,
            initialState: defaultSupplierFormState,
          }
        }}
      />
    </>
  )
}
