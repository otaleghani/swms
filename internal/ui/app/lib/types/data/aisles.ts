import { Response } from "../misc";
import { FormState } from "../form/form";

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

export type AisleWithExtra = {
  aisle: Aisle;
  racksCount: number;
  itemsCount: number;
};
export type AislesWithExtra = AisleWithExtra[];

export type AisleFormState = FormState<"Aisle">
export const defaultAisleFormState: AisleFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    zone: [],
  },
  result: emptyAisle,
}

export type AislesBulkFormState = FormState<"AislesBulk">;
export const defaultAislesBulkFormState: AislesBulkFormState = {
  error: false,
  message: "",
  errorMessages: {
    quantity: [],
    zone: [],
  },
  result: {
    quantity: 0,
    zone: "",
  }
}

export type AisleRP = Promise<Response<Aisle>>;
export type AislesRP = Promise<Response<Aisles>>;
export type AisleWithExtraRP = Promise<Response<AisleWithExtra>>;
export type AislesWithExtraRP = Promise<Response<AislesWithExtra>>;

export type AislesBulkPostRequestBody = {
  quantity: number;
  zone: string;
}
