import InputPattern from "./input/InputPattern";
import PositionSelectField from "../../modules/positions/PositionSelectField";
import { FormFieldsPropsWithDictMap } from "@/app/lib/types/form/fields";

export const ZoneFormFields = ({
  fields,
}: FormFieldsPropsWithDictMap["Zone"]) => {
  return (
    <>
      <InputPattern 
        field="name"
        dict={fields.name.dict}
        defaultValue={fields.name.defaultValue as string}
        className=""
        label={true}
        errorMessages={fields.name.errorMessages}
      />
    </>
  )
}

export const AisleFormFields = ({
  fields,
}: FormFieldsPropsWithDictMap["Aisle"]) => { return (
    <>
      <InputPattern 
        field="name"
        dict={fields.name.dict}
        defaultValue={fields.name.defaultValue as string}
        className=""
        label={true}
        errorMessages={fields.name.errorMessages}
      />
      <PositionSelectField 
        fields={{ zone: fields.zone }}
      />
    </>
  )
}

export const RackFormFields = ({
  fields,
}: FormFieldsPropsWithDictMap["Rack"]) => {}
