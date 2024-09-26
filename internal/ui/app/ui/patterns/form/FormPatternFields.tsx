import { Aisle, AisleFormProps, AisleFormState } from "@/app/lib/types/data/aisles";
import { ZoneFormProps } from "@/app/lib/types/data/zones";

/** Local components */
import InputPattern from "./input/InputPattern";
import PositionSelectField from "../../modules/positions/PositionSelectField";


export type ListFormConstants = "Aisle" | "Zone";
export interface ListFormProps {
  Aisle: {
    props: AisleFormProps;
  },
  Zone: {
    props: ZoneFormProps;
  }
}

import { AisleFormFieldsProps } from "@/app/lib/types/data/aisles";

export const AisleFormFields = (
  props: AisleFormFieldsProps) => { return (
    <>
      <InputPattern 
        field="name"
        dict={props.name.dict}
        defaultValue={props.name.defaultValue}
        className=""
        label={true}
        errorMessages={props.name.errorMessages}
      />
      <PositionSelectField 
        fields={{ zone: props.position.fields.zone.data }}
      />
    </>
  )
}
export const ZoneForm = (props: ListFormProps["Zone"]) => {
  return (
    <>
      got here, zone
    </>
  )
}
