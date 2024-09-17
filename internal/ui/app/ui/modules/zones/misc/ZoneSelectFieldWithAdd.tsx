/** Local compontens */
import SelectFieldPattern from "@/app/ui/patterns/form/select/SelectPattern";

/** Types and interfaces */
import { Zone } from "@/app/lib/types/data/zones";
import { SelectFieldPatternProps } from "@/app/ui/patterns/form/select/SelectPattern";

export default function ZoneSelectField({
  list,
  element,
  setElement,
  errors,
  dict,
}: SelectFieldPatternProps<Zone>) {
  return (
    <div className="flex gap-2 items-end">
      <SelectFieldPattern 
        name="zone"
        list={list}
        element={element} 
        setElement={setElement}
        dict={dict} 
        errors={errors}
      />

    </div>
  )
}
