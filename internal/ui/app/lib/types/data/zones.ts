import { FormState } from "./misc";

export type Zone = {
  id?: string;
  name: string;
};
export type Zones = Zone[];

export type ZoneExtended = Zone & {
  aislesCount: number;
  itemsCount: number;
};
export type ZonesExtended = ZoneExtended[];

export type ZoneFormState = FormState<Zone>
export const defaultZoneFormState: ZoneFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
  }
}
