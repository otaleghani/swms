import { DictFormButton, DictInputField, DictSelectField } from "../dictionary/form";
import { DictDialog } from "../dictionary/misc";
import { FormMap, FormPropsMap } from "./form";

/** Defines the props for an input field */
interface FieldInputProps {
  dict: DictInputField;
  defaultValue: string | number;
  errorMessages: string[];
}

/** Defines the props for an select field */
export interface FieldSelectPropsWithAdd<T extends keyof FormMap> {
  AddDialog: {
    self: {
      triggerType: "icon";
      dict: DictDialog;
    };
    FormPattern: FormPropsMap[T];
  };
  SelectField: {
    dict: DictSelectField;
    errorMessages: string[];
    defaultValue: string;
    list: FormMap[T][];
  };
};
export interface FieldSelectProps<T extends keyof FormMap> {
  // AddDialog: {
  //   self: {
  //     triggerType: "icon";
  //     dict: DictDialog;
  //   };
  //   FormPattern: FormPropsMap[T];
  // };
  SelectField: {
    dict: DictSelectField;
    errorMessages: string[];
    defaultValue: string;
    list: FormMap[T][];
  };
};

/** Maps every field */
export type FieldsPropsMap = {
  name: FieldInputProps;
  surname: FieldInputProps;
  description: FieldInputProps;
  

  // Foreign keys
  zone: FieldSelectProps<"Zone">;
  aisle: FieldSelectProps<"Aisle">;
  rack: FieldSelectProps<"Rack">;
  shelf: FieldSelectProps<"Shelf">;

  // Foreign keys with add
  zoneWithAdd: FieldSelectPropsWithAdd<"Zone">;
  aisleWithAdd: FieldSelectPropsWithAdd<"Aisle">;
  rackWithAdd: FieldSelectPropsWithAdd<"Rack">;
  shelfWithAdd: FieldSelectPropsWithAdd<"Shelf">;

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


/** Defines the fields for each type */
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

// What about a general dict for the component?
// I would need that for like the items or variants 
