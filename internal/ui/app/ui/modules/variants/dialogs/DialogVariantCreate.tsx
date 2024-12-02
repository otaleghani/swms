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
import { defaultVariantFormState } from "@/app/lib/types/data/variants";

interface Props {
  dict: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    identifier: InputFieldProps;
    quantity: InputFieldProps;
    length: InputFieldProps;
    width: InputFieldProps;
    height: InputFieldProps;
    weight: InputFieldProps;
    button: DictFormButton;
  }
}

export default function DialogVariantCreate({
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Variant"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "Variant",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              description: fields.description,
              identifier: fields.identifier,
              quantity: fields.quantity,
              length: fields.length,
              width: fields.width,
              height: fields.height,
              weight: fields.weight,
              button: fields.button,
            },
          },
          form: {
            formName: "Variant",
            formAction: createFormAction,
            initialState: defaultVariantFormState,
          }
        }}
      />
    </>
  )
}
