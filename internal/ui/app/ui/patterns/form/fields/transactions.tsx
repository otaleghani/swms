/** Local components */
import InputPattern from "../input/InputPattern";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const TransactionFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Transaction"]) => {
  return (
    <>
      <InputPattern 
        field="quantityWithButtons"
        dict={fields.quantity.dict}
        defaultValue={String(result?.quantity)}
        className=""
        label={true}
        errorMessages={errorMessages.quantity}
      />
      <input type="hidden" name="type" value="Transaction" />
    </>
  )
}
