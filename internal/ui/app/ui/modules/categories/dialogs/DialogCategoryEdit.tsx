// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Category } from "@/app/lib/types/data/categories";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultCategoryFormState } from "@/app/lib/types/data/categories";
import { fieldsDefaultProps, InputFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  category: Category;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
  },
  dict: DictDialog;
}

export default function DialogCategoryEdit({
  category,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Category"> 
        showButton
        self={{
          triggerType: "iconEdit",
          dict: dict,
        }}
        formPattern={{
          type: "Category",
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: fields.name,
              description: fields.description,
              button: fields.button
            },
          },
          form: {
            formName: "updateCategory" + category.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultCategoryFormState,
              result: {
                id: category.id as string,
                name: category.name as string,
                description: category.description as string,
              }
            }
          }
        }}
      />
    </>
  )
}
