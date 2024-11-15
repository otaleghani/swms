// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { SupplierCode } from "@/app/lib/types/data/supplierCodes";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultSupplierCodeFormState } from "@/app/lib/types/data/supplierCodes";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  supplierCode: SupplierCode;
  fields: {
    code: InputFieldProps;
    supplier: SelectFieldProps<"Supplier">;
    item: SelectFieldProps<"Item">;
    variant: SelectFieldProps<"Variant">;
    button: DictFormButton;
  },
  dict: DictDialog;
}

export default function DialogSupplierCodeEdit({
  supplierCode,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"SupplierCode"> 
        showButton
        self={{
          triggerType: "iconEdit",
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
            formName: "updateSupplierCode" + supplierCode.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultSupplierCodeFormState,
              result: {
                id: supplierCode.id as string,
                code: supplierCode.code as string,
                supplier: supplierCode.supplier as string,
                item: supplierCode.item as string,
                variant: supplierCode.variant as string,
              }
            }
          }
        }}
      />
    </>
  )
}
