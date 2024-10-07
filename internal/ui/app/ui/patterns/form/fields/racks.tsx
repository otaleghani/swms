/** Local components */
import InputPattern from "../input/InputPattern";
import PositionSelectField from "@/app/ui/modules/positions/PositionSelectField";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const RackFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Rack"]) => { 

  let defaultZone = result?.zone ? 
    fields.zone.list.find(i => i.id === result.zone) : undefined;
  let defaultAisle = result?.aisle ? 
    fields.aisle.list.find(i => i.id === result.aisle) : undefined;

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
        },
        aisle: {
          select: fields.aisle,
          defaultValue: defaultAisle,
          errorMessages: errorMessages.aisle,
        }
      }}
    />
  </>
)}

export const RacksBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["RacksBulk"]) => { return (
  <>
    <InputPattern 
      field="quantityWithButtons"
      dict={fields.quantity.dict}
      defaultValue={String(result?.number)}
      className=""
      label={true}
      errorMessages={errorMessages.number}
    />
    <PositionSelectField 
      fields={{ 
        zone: {
          select: fields.zone,
          errorMessages: errorMessages.zone,
        },
        aisle: {
          select: fields.aisle,
          errorMessages: errorMessages.aisle,
        },
      }}
    />
  </>
)}
