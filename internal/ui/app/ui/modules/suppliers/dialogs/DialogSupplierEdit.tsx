// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Supplier } from "@/app/lib/types/data/suppliers";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultSupplierFormState } from "@/app/lib/types/data/suppliers";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  supplier: Supplier;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
  },
  dict: DictDialog;
}

export default function DialogSupplierEdit({
  supplier,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Supplier"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Supplier",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              description: fields.description,
              button: fields.button
            },
          },
          form: {
            formName: "updateSupplier" + supplier.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultSupplierFormState,
              result: {
                id: supplier.id as string,
                name: supplier.name as string,
              }
            }
          }
        }}
      />
    </>
  )
}
