/** Local components */
import InputPattern from "../input/InputPattern"

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields"


export const TicketFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Ticket"] ) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name as string[]}
    />
    <InputPattern 
      field="description"
      dict={fields.description.dict}
      defaultValue={result?.description}
      className=""
      label={true}
      errorMessages={errorMessages.description as string[]}
    />
    {
    /** @todo - Create date field,
    *   @todo - Finish up forms */
    //<InputPattern 
    //  field="open"
    //  dict={fields.description.dict}
    //  defaultValue={result?.description}
    //  className=""
    //  label={true}
    //  errorMessages={errorMessages.description as string[]}
    ///>
    }
  </>
)}
