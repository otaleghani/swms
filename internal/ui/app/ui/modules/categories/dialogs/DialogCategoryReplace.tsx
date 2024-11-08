"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

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
  const [currentList, setCurrentList] = useState(fields.category.list);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentList,
      setList: setCurrentList,
      type: "Zone",
    });
  }, []);

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
              category: {
                ...fields.category,
                list: currentList,
              },
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
