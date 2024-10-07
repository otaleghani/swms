/** Local components */
import InputPattern from "../input/InputPattern"

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields"


export const ClientFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Client"] ) => { return (
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
      field="isBusiness"
      dict={fields.isBusiness.dict}
      //defaultValue={result?.isBusiness}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
  </>
)}
