import { Response } from "../misc";
import { FormState } from "../form/form";

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

export type ZoneFormState = FormState<"Zone">
export const defaultZoneFormState: ZoneFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
  }
}

export type ZonesBulkFormState = FormState<"ZonesBulk">;
export const defaultZonesBulkFormState: ZonesBulkFormState = {
  error: false,
  message: "",
  errorMessages: {
    quantity: [],
  }
}

export type ZoneRP = Promise<Response<Zone>>;
export type ZonesRP = Promise<Response<Zones>>;
export type ZoneWithExtraRP = Promise<Response<ZoneWithExtra>>;
export type ZonesWithExtraRP = Promise<Response<ZonesWithExtra>>;

export type ZonesBulkPostRequestBody = {
  number: number;
}
