/** React hooks */
import { useRef } from "react";

/** Local components */
import { Label } from "@/app/ui/components/label";
import { SelectPatternCombobox } from "./SelectPatternCombobox";

/** Types and interfaces */
import { DictionarySelectField } from "@/app/lib/types/dictionary/form";
import FormFieldErrorsPattern from "../FormFieldErrorsPattern";

export interface SelectableItem {
  id?: string,
  name: string,
}
export interface SelectFieldPatternProps<Entity extends SelectableItem>{
  name?: string;
  list: Entity[];
  element: Entity;
  setElement: React.Dispatch<React.SetStateAction<Entity>>;
  errors: string[];
  dict: DictionarySelectField;
}

export default function SelectFieldPattern<Entity extends SelectableItem>({
  name,
  list, 
  element, 
  setElement, 
  errors,
  dict 
}: SelectFieldPatternProps<Entity>) {
  //const inputId = useRef(`id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const inputId = "sandeo"

  return (
    <div className="w-full">
      <input 
        required
        type="hidden" 
        id={`${name}-${inputId}`}
        name={name}
        value={element.id} 
      />
      <Label>{dict.name}</Label>
      <SelectPatternCombobox 
        name={name}
        list={list}
        element={element} 
        setElement={setElement}
        dict={dict} 
        errors={errors}
      />
      <FormFieldErrorsPattern
        id={`${name}-${inputId}-errors`}
        errorMessages={errors}
      />
    </div>
  );
};
