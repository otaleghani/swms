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
import { defaultSupplierCodeFormState } from "@/app/lib/types/data/supplierCodes";

interface Props {
  dict: DictDialog;
  fields: {
    code: InputFieldProps;
    supplier: SelectFieldProps<"Supplier">;
    item: SelectFieldProps<"Item">;
    variant: SelectFieldProps<"Variant">;
    button: DictFormButton;
  }
}

export default function DialogSupplierCodeCreate({
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"SupplierCode"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "SupplierCode",
          self: {
            fields: {
              ...fieldsDefaultProps,
              code: fields.code,
              supplier: fields.supplier,
              item: fields.item,
              variant: fields.variant,
              button: fields.button,
            },
          },
          form: {
            formName: "SupplierCode",
            formAction: createFormAction,
            initialState: defaultSupplierCodeFormState,
          }
        }}
      />
    </>
  )
}
