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
import { defaultSubcategoryFormState } from "@/app/lib/types/data/subcategories";

interface Props {
  dict: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    category: SelectFieldProps<"Category">;
    button: DictFormButton;
  }
}

export default function DialogSubcategoryCreate({
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Subcategory"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict,
        }}
        formPattern={{
          type: "Subcategory",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              description: fields.description,
              category: fields.category,
              button: fields.button,
            },
          },
          form: {
            formName: "Subcategory",
            formAction: createFormAction,
            initialState: defaultSubcategoryFormState,
          }
        }}
      />
    </>
  )
}
