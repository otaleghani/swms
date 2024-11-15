// Actions
import { removeFormAction } from "@/app/lib/actions/remove/removeFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { SupplierCode } from "@/app/lib/types/data/supplierCodes";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { defaultRemoveFormState } from "@/app/lib/types/data/remover";

interface Props {
  supplierCode: SupplierCode;
  fields: {
    button: DictFormButton;
  },
  dict: DictDialog;
}

export default function DialogSupplierCodeDelete({
  supplierCode,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Delete"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Delete",
          self: {
            fields: {
              ...fieldsDefaultProps,
              button: fields.button,
            },
          },
          form: {
            formName: "deleteSupplierCode" + supplierCode.id as string,
            formAction: removeFormAction,
            initialState: {
              ...defaultRemoveFormState,
              result: {
                id: supplierCode.id as string,
                type: "SupplierCode"
              }
            }
          }
        }}
      />
    </>
  )
}
