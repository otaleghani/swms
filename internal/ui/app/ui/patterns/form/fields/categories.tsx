/** Local components */
import InputPattern from "../input/InputPattern";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const CategoryFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Category"] ) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <InputPattern 
      field="description"
      dict={fields.description.dict}
      defaultValue={result?.description}
      className=""
      label={true}
      errorMessages={errorMessages.description as string[]}
    />
    <input type="hidden" name="type" value="Category" />
  </>
)}
