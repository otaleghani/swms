"use client";

/** React hooks */
import { useState } from "react";

/** Types and interfaces */
import { 
  SelectFieldPatternWithAddProps, 
  SelectableItem 
} from "@/app/lib/types/form/fields";
import SelectFieldPattern from "./SelectFieldPattern";
import DialogFormPattern from "../../dialog/DialogFormPattern";
import { addNewItemToList } from "./action";
import { FormMap } from "@/app/lib/types/form/form";

export default function SelectFieldWithAddPattern<T extends SelectableItem>({
  addDialog,
  selectField,
  element,
  setElement,
  errorMessages
}: SelectFieldPatternWithAddProps<T> & {errorMessages: string[]}) {
  const [list, setList] = useState(selectField.list);

  const refreshList = (item: FormMap[T]) => {
    addNewItemToList(item, list, setList as any);
    setElement(item);
  };

  return (
    <div className="flex items-end w-full gap-2">
      <div className="w-full">
        <SelectFieldPattern<T>
          name={selectField.name}
          list={selectField.list}
          dict={selectField.dict}
          element={element}
          setElement={setElement}
          errorMessages={errorMessages}
        />
        <DialogFormPattern<T> 
          {...addDialog}
          formPattern={{
            ...addDialog.formPattern,
            formPattern: {
              ...addDialog.formPattern.form,
              refreshItemList: refreshList,
            }
          }}
        />
      </div>
    </div>
  );
};
