/** Local compontens */
import 
  SelectFieldPattern, 
  { SelectFieldPatternProps } 
from "@/app/ui/patterns/form/select/SelectFieldPattern";

/** Types and interfaces */
import { Zone } from "@/app/lib/types/data/zones";

export default function ZoneSelectField({
  list,
  element,
  setElement,
  errors,
  dict,
}: SelectFieldPatternProps<Zone>) {
  return (
    <SelectFieldPattern 
      name="zone"
      list={list}
      element={element} 
      setElement={setElement}
      dict={dict} 
      errors={errors}
    />
  )
}
