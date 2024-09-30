import { DictDialog } from "../dictionary/misc";
import { 
  DictFormButton, 
  DictInputField, 
  DictSelectField 
} from "../dictionary/form";
import { 
  FormMap, 
  FormPropsMap 
} from "./form";

/** Defines the props for an input field */
interface InputFieldProps {
  dict: DictInputField;
  defaultValue: string | number;
  errorMessages: string[];
}

export type SelectableItem = keyof Omit<FormMap, "Item">;

export interface SelectFieldProps<T extends SelectableItem> {
  name: T;
  list: FormMap[T][];
  errorMessages: string[];
  dict: DictSelectField;
}
export type SelectFieldPatternProps<T extends SelectableItem> = SelectFieldProps<T> & {
  name: T;
  element: FormMap[T]; // This would be used as a default value, if needed
  setElement: React.Dispatch<React.SetStateAction<FormMap[T]>>;
  list: FormMap[T][];
  errorMessages: string[];
  dict: DictSelectField;
};

/** Defines the props for an select field */
export interface SelectFieldPropsWithAdd<T extends SelectableItem> {
  AddDialog: {
    self: {
      triggerType: "icon";
      dict: DictDialog;
    };
    FormPattern: FormPropsMap[T];
  };
  SelectField: SelectFieldProps<T>;
};


/** Maps every field */
export type FieldsPropsMap = {
  name: InputFieldProps;
  surname: InputFieldProps;
  description: InputFieldProps;
  

  // Foreign keys
  zone: SelectFieldProps<"Zone">;
  aisle: SelectFieldProps<"Aisle">;
  rack: SelectFieldProps<"Rack">;
  shelf: SelectFieldProps<"Shelf">;
  category: SelectFieldProps<>

  // Foreign keys with add
  zoneWithAdd: SelectFieldPropsWithAdd<"Zone">;
  aisleWithAdd: SelectFieldPropsWithAdd<"Aisle">;
  rackWithAdd: SelectFieldPropsWithAdd<"Rack">;
  shelfWithAdd: SelectFieldPropsWithAdd<"Shelf">;

  // Button
  button: DictFormButton;
}

type FieldsPropsNullMap = {
  [K in keyof FieldsPropsMap]: null;
}
export const fieldsDefaultProps: FieldsPropsNullMap = {
  name: null,
  surname: null,
  description: null,

  zone: null,
  aisle: null,
  rack: null,
  shelf: null,

  zoneWithAdd: null,
  aisleWithAdd: null,
  rackWithAdd: null,
  shelfWithAdd: null,

  button: null,
}


/** Defines the fields for each type. */
export type ZoneFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type AisleFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type RackFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type ShelfFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "rack" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
//export type 


/** Maps every fields for each type */
type FormFieldsPropsMap = {
  [K in keyof FormMap]: 
    K extends "Zone" ? ZoneFormFieldsProps :
    K extends "Aisle" ? AisleFormFieldsProps :
    K extends "Rack" ? RackFormFieldsProps :
    K extends "Shelf" ? ShelfFormFieldsProps :
    never;
}

interface DictItemsForm {
  sections: {
    basics: string;
  }
}

type DictFormMap = {
  [K in keyof FormMap]: 
    K extends "Item" ? DictItemsForm :
    never;
}

export type FormFieldsPropsWithDictMap = {
  [K in keyof FormMap]: {
    dict?: DictFormMap[K];
    fields: FormFieldsPropsMap[K];
  }
}
