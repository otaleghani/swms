import { FormState, Response } from "../misc";

export type Shelf = {
  id?: string;
  name: string;
  zone: string;
  aisle: string;
  rack: string;
};
export type Shelfs = Shelf[];

export type ShelfWithExtra = Shelf & {
  itemsCount: number;
};
export type ShelfsWithExtra = ShelfWithExtra[];

export type ShelfFormState = FormState<Shelf>
export const defaultShelfFormState: ShelfFormState = {
  error: false,
  message: "",
  errorMessages: {
    id: [],
    name: [],
    zone: [],
    aisle: [],
    rack: [],
  }
}

export type ShelfRP = Promise<Response<Shelf>>;
export type ShelfsRP = Promise<Response<Shelfs>>;
export type ShelfWithExtraRP = Promise<Response<ShelfWithExtra>>;
export type ShelfsWithExtraRP = Promise<Response<ShelfsWithExtra>>;

export type ShelfsBulkPostRequestBody = {
  number: number;
  zone: string;
  aisle: string;
}
