import { FormState, Response } from "../misc";

export type Rack = {
  id?: string;
  name: string;
  zone: string;
  aisle: string;
};
export type Racks = Rack[];

export type RackWithExtra = Rack & {
  shelfsCount: number;
  itemsCount: number;
};
export type RacksWithExtra = RackWithExtra[];

export type RackFormState = FormState<Rack>
export const defaultRackFormState: RackFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
    zone: [],
    aisle: [],
  }
}

export type RackRP = Promise<Response<Rack>>;
export type RacksRP = Promise<Response<Racks>>;
export type RackWithExtraRP = Promise<Response<RackWithExtra>>;
export type RacksWithExtraRP = Promise<Response<RacksWithExtra>>;

export type RacksBulkPostRequestBody = {
  number: number;
  zone: string;
  aisle: string;
}

