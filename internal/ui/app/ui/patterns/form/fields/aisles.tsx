/** Local components */
import InputPattern from "../input/InputPattern";
import PositionSelectField from "@/app/ui/modules/positions/PositionSelectField";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const AisleFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Aisle"]) => {
  let defaultZone = result?.zone ? 
    fields.zone.list.find(i => i.id === result.zone) : undefined;

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
      <PositionSelectField 
        fields={{ 
          zone: {
            select: fields.zone,
            defaultValue: defaultZone,
            errorMessages: errorMessages.zone,
          }
        }}
      />
      <input type="hidden" name="type" value="Aisle" />
    </>
)}  

export const AislesBulkFormFields = ({
    fields,
    result,
    errorMessages
}:   FormFieldsPropsWithDictCompleteMap["AislesBulk"]) => { return (
    <>
      <InputPattern 
        field="quantityWithButtons"
        dict={fields.quantity.dict}
        defaultValue={String(result?.number)}
        className=""
        label={true}
        errorMessages={errorMessages.quantity}
      />
      <PositionSelectField 
        fields={{ 
          zone: {
            select: fields.zone,
            errorMessages: errorMessages.zone,
          },
        }}
      />
      <input type="hidden" name="type" value="AislesBulk" />
    </>
)}
