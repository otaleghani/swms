import { FormState, Response } from "../misc";

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
  zone: string;
}
