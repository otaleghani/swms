"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Supplier } from "@/app/lib/types/data/suppliers";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  supplier: Supplier;
  dict: DictDialog;
  fields: {
    supplier: SelectFieldProps<"Supplier">;
    button: DictFormButton;
  }
}

export default function DialogSupplierReplace({
  supplier,
  fields,
  dict
}: Props) {
  const [currentList, setCurrentList] = useState(fields.supplier.list);

  useEffect(() => {
    synchronizeList<"Supplier">({
      streamer: streamer as Worker,
      list: currentList,
      setList: setCurrentList,
      type: "Supplier",
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
              id: supplier.id as string,
              supplier: {
                ...fields.supplier,
                list: currentList,
              },
              button: fields.button
            },
          },
          form: {
            formName: "replaceSupplier" + supplier.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: supplier.id ? supplier.id : "",
                itemThatReplaces: "",
                type: "Supplier",
              },
            },
          },
        }}
      />
    </>
  )
}
