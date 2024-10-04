/** Local components */
import InputPattern from "../input/InputPattern";
import PositionSelectField from "@/app/ui/modules/positions/PositionSelectField";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const ShelfFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Shelf"]) => { return (
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
          errorMessages: errorMessages.zone,
        },
        aisle: {
          select: fields.aisle,
          errorMessages: errorMessages.aisle,
        },
        rack: {
          select: fields.rack,
          errorMessages: errorMessages.rack,
        }
      }}
    />
  </>
)}

export const ShelfsBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["ShelfsBulk"]) => { return (
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
        rack: {
          select: fields.rack,
          errorMessages: errorMessages.rack,
        },
      }}
    />
  </>
)}
