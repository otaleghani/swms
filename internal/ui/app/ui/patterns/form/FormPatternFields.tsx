import InputPattern from "./input/InputPattern";
import PositionSelectField from "../../modules/positions/PositionSelectField";
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
  </>
)}

export const AisleFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Aisle"]) => { return (
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
        }
      }}
    />
  </>
)}

export const RackFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Rack"]) => { return (
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
        }
      }}
    />
  </>
)}

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
      errorMessages={errorMessages.number}
    />
  </>
)}

export const AislesBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["AislesBulk"]) => { return (
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
