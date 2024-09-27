import { Dispatch, SetStateAction } from "react";
import { FormFieldsPropsWithDictMap } from "./fields";

import { Zone } from "../data/zones";
import { Aisle } from "../data/aisles";
import { Rack } from "../data/racks";
import { Shelf } from "../data/shelfs";
import { Item } from "../data/items";


// Lists all the possible forms
export interface FormMap {
  Zone: Zone;
  Aisle: Aisle;
  Rack: Rack;
  Shelf: Shelf;
  Item: Item;
}

interface FormState<T extends keyof FormMap> {
  error: boolean;
  message: string
  result?: FormMap[T];
  errorMessages: {
    [K in keyof FormMap[T]]: string[];
  }
}

interface FormProps<T extends keyof FormMap> {
  formName: string;
  initialState: FormState<T>;
  formAction: (
    currentState: FormState<T>,
    formData: FormData,
  ) => Promise<FormState<any>>;
  notifyFormSent?: Dispatch<SetStateAction<boolean>>;
  refreshItemList?: (item: T) => void;
}

export type FormPropsMap = {
  [K in keyof FormMap]: {
    self: FormFieldsPropsWithDictMap[K];
    form: FormProps<K>
    type: K;
  }
}
