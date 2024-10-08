/** Local components */
import InputPattern from "../input/InputPattern";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const ZoneFormFields = ({
  fields,
  errorMessages,
  result
}: FormFieldsPropsWithDictCompleteMap["Zone"]) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <input type="hidden" name="type" value="Zone" />
  </>
)}

export const ZonesBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["ZonesBulk"]) => { return (
  <>
    <InputPattern 
      field="quantityWithButtons"
      dict={fields.quantity.dict}
      defaultValue={String(result?.number)}
      className=""
      label={true}
      errorMessages={errorMessages.quantity}
    />
    <input type="hidden" name="type" value="ZonesBulk" />
  </>
)}
