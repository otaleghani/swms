/** Local components */
import InputPattern from "../input/InputPattern";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const UserFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["User"]) => {
  return (
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
        field="surname"
        dict={fields.surname.dict}
        defaultValue={result?.surname}
        className=""
        label={true}
        errorMessages={errorMessages.surname}
      />
      <InputPattern 
        field="email"
        dict={fields.email.dict}
        defaultValue={result?.email}
        className=""
        label={true}
        errorMessages={errorMessages.email}
      />
      <input type="hidden" name="type" value="User" />
    </>
  )
}
