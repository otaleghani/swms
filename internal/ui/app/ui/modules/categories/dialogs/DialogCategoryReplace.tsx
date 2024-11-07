// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Category } from "@/app/lib/types/data/categories";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  category: Category;
  dict: DictDialog;
  fields: {
    category: SelectFieldProps<"Category">;
    button: DictFormButton;
  }
}

export default function DialogCategoryReplace({
  category,
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
              id: category.id as string,
              category: fields.category,
              button: fields.button
            },
          },
          form: {
            formName: "replaceCategory" + category.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: category.id ? category.id : "",
                itemThatReplaces: "",
                type: "Category",
              },
            },
          },
        }}
      />
    </>
  )
}
