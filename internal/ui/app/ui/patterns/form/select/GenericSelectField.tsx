/** Local components */
import SelectFieldPattern from "./SelectFieldPattern";

import { SelectableItem, SelectFieldPatternProps } from "@/app/lib/types/form/fields";

export type GenericSelectFieldsProps<K extends SelectableItem> = {
  errorMessages: string[];
  selectField: SelectFieldPatternProps<K>;
}

export default function GenericSelectFields<K extends SelectableItem>({
  errorMessages,
  selectField,
}: GenericSelectFieldsProps<K>) {
  //const [selectedObject, setSelectedObject] = useState(emptyMap[selectField.name]);

  return (
    <SelectFieldPattern<K> 
      name={selectField.name}
      element={selectField.element}
      setElement={selectField.setElement}
      list={selectField.list}
      errorMessages={errorMessages}
      dict={selectField.dict}
    />
  )
}
