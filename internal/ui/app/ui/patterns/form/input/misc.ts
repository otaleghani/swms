import { DictCheckboxField, DictInputField } from "@/app/lib/types/dictionary/form";

export function isInputFieldDict(m: DictInputField | DictCheckboxField):
  m is DictInputField {
  return (m as DictInputField).placeholder !== undefined;
}
