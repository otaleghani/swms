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
import { defaultCategoryFormState } from "@/app/lib/types/data/categories";

interface Props {
  dict: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
  }
}

export default function DialogCategoryCreate({
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Category"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "Category",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              description: fields.description,
              button: fields.button,
            },
          },
          form: {
            formName: "Category",
            formAction: createFormAction,
            initialState: defaultCategoryFormState,
          }
        }}
      />
    </>
  )
}
