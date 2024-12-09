// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Variant } from "@/app/lib/types/data/variants";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultVariantFormState } from "@/app/lib/types/data/variants";
import { fieldsDefaultProps, InputFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  variant: Variant;
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
  },
  dict: DictDialog;
}

export default function DialogVariantEdit({
  variant,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Variant"> 
        showButton
        self={{
          triggerType: "iconEdit",
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
              button: fields.button
            },
          },
          form: {
            formName: "updateVariant" + variant.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultVariantFormState,
              result: {
                id: variant.id as string,
                name: variant.name as string,
                description: variant.description as string,
                identifier: variant.identifier as string,
                quantity: variant.quantity as number,
                length: variant.length as number,
                width: variant.width as number,
                height: variant.height as number,
                weight: variant.weight as number,
                isDefaultVariant: variant.isDefaultVariant as boolean,
                item: variant.item as string,
              }
            }
          }
        }}
      />
    </>
  )
}
