import { Response } from "../misc";
import { FormState } from "../form/form";

export type Shelf = {
  id?: string;
  name: string;
  zone: string;
  aisle: string;
  rack: string;
};
export type Shelfs = Shelf[];
export const emptyShelf: Shelf = {
  id: "",
  name: "",
  zone: "",
  aisle: "",
  rack: "",
}

export type ShelfWithExtra = {
  shelf: Shelf;
  itemsCount: number;
};
export type ShelfsWithExtra = ShelfWithExtra[];

export type ShelfFormState = FormState<"Shelf">
export const defaultShelfFormState: ShelfFormState = {
  error: false,
  message: "",
  errorMessages: {
    name: [],
    zone: [],
    aisle: [],
    rack: [],
  },
  result: {
    id: "",
    name: "",
    zone: "",
    aisle: "",
    rack: "",
  }
}

export type ShelfsBulkFormState = FormState<"ShelfsBulk">;
export const defaultShelfsBulkFormState: ShelfsBulkFormState = {
  error: false,
  message: "",
  errorMessages: {
    quantity: [],
    zone: [],
    aisle: [],
    rack: [],
  },
  result: {
    quantity: 0,
    zone: "",
    aisle: "",
    rack: "",
  }
}

export type ShelfRP = Promise<Response<Shelf>>;
export type ShelfsRP = Promise<Response<Shelfs>>;
export type ShelfWithExtraRP = Promise<Response<ShelfWithExtra>>;
export type ShelfsWithExtraRP = Promise<Response<ShelfsWithExtra>>;

export type ShelfsBulkPostRequestBody = {
  quantity: number;
  zone: string;
  aisle: string;
  rack: string;
}
