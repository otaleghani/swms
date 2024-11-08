// Actions
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Subcategory } from "@/app/lib/types/data/subcategories";
import { DictDialog } from "@/app/lib/types/dictionary/misc";

// Default values
import { defaultSubcategoryFormState } from "@/app/lib/types/data/subcategories";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  subcategory: Subcategory;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    category: SelectFieldProps<"Category">;
    button: DictFormButton;
  },
  dict: DictDialog;
}

export default function DialogSubcategoryEdit({
  subcategory,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Subcategory"> 
        showButton
        self={{
          triggerType: "iconEdit",
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
              button: fields.button
            },
          },
          form: {
            formName: "updateSubcategory" + subcategory.id as string,
            formAction: updateFormAction,
            initialState: {
              ...defaultSubcategoryFormState,
              result: {
                id: subcategory.id,
                name: subcategory.name,
                category: subcategory.category,
                description: subcategory.description,
              }
            }
          }
        }}
      />
    </>
  )
}
