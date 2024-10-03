/** Types and interfaces */
import { 
  SelectFieldPatternWithAddProps, 
  SelectableItem 
} from "@/app/lib/types/form/fields";
import SelectFieldPattern from "./SelectFieldPattern";
import DialogFormPattern from "../../dialog/DialogFormPattern";

export default function SelectFieldWithAddPattern<T extends SelectableItem>({
  addDialog,
  selectField,
  element,
  setElement,
  errorMessages
}: SelectFieldPatternWithAddProps<T> & {errorMessages: string[]}) {
  const inputId = (`${Math.random().toString(36).substring(2, 9)}`);

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
        />
      </div>
    </div>
  );
};
