// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Subcategory } from "@/app/lib/types/data/subcategories";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  subcategory: Subcategory;
  dict: DictDialog;
  fields: {
    category: SelectFieldProps<"Category">;
    subcategory: SelectFieldProps<"Subcategory">;
    button: DictFormButton;
  }
}

export default function DialogSubcategoryReplace({
  subcategory,
  fields,
  dict
}: Props) {

  return (
    <>
      <DialogFormPattern<"Replace">
        showButton
        self={{
          triggerType: "iconDelete",
          dict: dict,
        }}
        formPattern={{
          type: "Replace",
          self: {
            fields: {
              ...fieldsDefaultProps,
              id: subcategory.id as string,
              category: fields.category,
              subcategory: fields.subcategory,
              button: fields.button
            },
          },
          form: {
            formName: "replaceSubcategory" + subcategory.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: subcategory.id ? subcategory.id : "",
                itemThatReplaces: "",
                type: "Subcategory",
              },
            },
          },
        }}
      />
    </>
  )
}
