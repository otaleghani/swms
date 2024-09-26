import { FormState, Response } from "../misc";

export type Zone = {
  id?: string;
  name: string;
};
export type Zones = Zone[];
export const emptyZone: Zone = {
  id: "",
  name: "",
}

export type ZoneWithExtra = Zone & {
  aislesCount: number;
  itemsCount: number;
};
export type ZonesWithExtra = ZoneWithExtra[];

export type ZoneFormState = FormState<Zone>
export const defaultZoneFormState: ZoneFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
  }
}

export type ZoneBulkFormState = FormState<ZonesBulkPostRequestBody>;
export const defaultZoneBulkFormState: ZoneBulkFormState = {
  error: false,
  message: "",
  errorMessages: {
    number: [],
  }
}

export type ZoneRP = Promise<Response<Zone>>;
export type ZonesRP = Promise<Response<Zones>>;
export type ZoneWithExtraRP = Promise<Response<ZoneWithExtra>>;
export type ZonesWithExtraRP = Promise<Response<ZonesWithExtra>>;

export type ZonesBulkPostRequestBody = {
  number: number;
}

import { FormProps } from "../misc";
import { DictBulkZoneForm, DictZoneForm } from "../dictionary/data/zone";
import { SelectFieldWithAddProps } from "@/app/ui/modules/positions/PositionSelectField";
export interface ZoneBulkFormProps {
  self: {
    form: FormProps<ZonesBulkPostRequestBody>;
    dict: DictBulkZoneForm;
  }
}

export interface ZoneFormProps {
  self: {
    dict: DictZoneForm;
    fields: any;
  }
  type: string;
  form: FormProps<Zone>;
}
