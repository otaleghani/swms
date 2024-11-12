/** Local components */
import InputPattern from "../input/InputPattern";
import PositionSelectField from "@/app/ui/modules/positions/PositionSelectField";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const ShelfFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Shelf"]) => {

  let defaultZone = result?.zone ? 
    fields.zone.list.find(i => i.id === result.zone) : undefined;
  let defaultAisle = result?.aisle ? 
    fields.aisle.list.find(i => i.id === result.aisle) : undefined;
  let defaultRack = result?.rack ? 
    fields.rack.list.find(i => i.id === result.rack) : undefined;

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
        },
        rack: {
          select: fields.rack,
          defaultValue: defaultRack,
          errorMessages: errorMessages.rack,
        }
      }}
    />
    <input type="hidden" name="type" value="Shelf" />
  </>
)}

export const ShelfsBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["ShelfsBulk"]) => { 
  let defaultZone = result?.zone ? 
    fields.zone.list.find(i => i.id === result.zone) : undefined;
  let defaultAisle = result?.aisle ? 
    fields.aisle.list.find(i => i.id === result.aisle) : undefined;
  let defaultRack = result?.rack ? 
    fields.rack.list.find(i => i.id === result.rack) : undefined;

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
    <PositionSelectField 
      fields={{ 
        zone: {
          defaultValue: defaultZone,
          select: fields.zone,
          errorMessages: errorMessages.zone,
        },
        aisle: {
          defaultValue: defaultAisle,
          select: fields.aisle,
          errorMessages: errorMessages.aisle,
        },
        rack: {
          defaultValue: defaultRack,
          select: fields.rack,
          errorMessages: errorMessages.rack,
        },
      }}
    />
    <input type="hidden" name="type" value="ShelfsBulk" />
  </>
)}
