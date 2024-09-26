import { FormState, Response } from "../misc";
import { Zone } from "./zones";

export type Aisle = {
  id?: string;
  name: string;
  zone: string;
};
export type Aisles = Aisle[];
export const emptyAisle: Aisle = {
  id: "",
  name: "",
  zone: "",
}

export type AisleWithExtra = Aisle & {
  racksCount: number;
  itemsCount: number;
};
export type AislesWithExtra = AislesWithExtra[];

export type AisleFormState = FormState<Aisle>
export const defaultAisleFormState: AisleFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
    zone: [],
  }
}

export type AisleRP = Promise<Response<Aisle>>;
export type AislesRP = Promise<Response<Aisles>>;
export type AisleWithExtraRP = Promise<Response<AisleWithExtra>>;
export type AislesWithExtraRP = Promise<Response<AislesWithExtra>>;

export type AislesBulkPostRequestBody = {
  number: number;
  zone: Zone;
}

import { FormProps } from "../misc";
import { DictAisleForm, DictBulkAisleForm } from "../dictionary/data/aisle";
import { SelectFieldWithAddProps } from "@/app/ui/modules/positions/PositionSelectField";
import { DictInputField } from "../dictionary/form";
export interface AislesBulkFormProps {
  self: {
    form: FormProps<AislesBulkPostRequestBody>;
    dict: DictBulkAisleForm;
  }
  propsPositionSelect: {
    fields: {
      zone: SelectFieldWithAddProps<Zone, "Zone">;
    }
  }
}

export interface AisleFormProps {
  self: {
    dict: DictAisleForm;
    fields: AisleFormFieldsProps;
  }
  form: FormProps<Aisle>;
  type: string;
}

// I need to differentiate the props of the FORM with the FIELDS

// Generic
export interface TestAisleFormProps {
  type: string;             // Aisle
  form: FormProps<Aisle>;   
}


// FIELDS
export interface AisleFormFieldsProps {
  name: {
    dict: DictInputField;
    defaultValue: string;
    errorMessages: string[];
  },
  position: {
    fields: {
      zone: {
        data: SelectFieldWithAddProps<Zone, "Zone">;
        defaultValue: string;
        errorMessages: string[];
      }
    }
  }
}

