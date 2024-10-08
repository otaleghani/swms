/** React hooks */
import { Dispatch, SetStateAction } from "react";

/** Local components */
import { Label } from "@/app/ui/components/label";
import { SelectFieldPatternCombobox } from "./SelectFieldPatternCombobox";

/** Types and interfaces */
import FormFieldErrorsPattern from "../FormFieldErrorsPattern";
import { 
  SelectFieldPatternProps, 
  SelectableItem 
} from "@/app/lib/types/form/fields";
import { FormMap } from "@/app/lib/types/form/form";

export default function SelectFieldPattern<T extends SelectableItem>({
  name,
  list, 
  element, 
  setElement, 
  errorMessages,
  dict,
}: SelectFieldPatternProps<T> & {errorMessages: string[]}) {
  const inputId = (`${Math.random().toString(36).substring(2, 9)}`);

  return (
    <div className="w-full">
      <input 
        suppressHydrationWarning
        required
        type="hidden" 
        id={`${name}-${inputId}`}
        name={name}
        value={element.id} 
      />
      <Label>{dict.select.label}</Label>
      <SelectFieldPatternCombobox 
        name={name}
        list={list}
        element={element} 
        setElement={setElement as Dispatch<SetStateAction<FormMap[SelectableItem]>>}
        dict={dict} 
      />
      <FormFieldErrorsPattern
        id={`${name}-${inputId}-errors`}
        errorMessages={errorMessages}
      />
    </div>
  );
};
