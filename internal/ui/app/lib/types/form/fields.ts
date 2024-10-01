import { DictDialog } from "../dictionary/misc";
import { 
    DictCheckboxField,
  DictFormButton, 
  DictInputField, 
  DictSelectField 
} from "../dictionary/form";
import { 
  FormMap, 
  FormPropsMap 
} from "./form";
import { Zone } from "../../types";

/** Defines props for an input field */
interface InputFieldProps {
  dict: DictInputField;
  //defaultValue: string | number;
  //errorMessages: string[];
}

/** Defines props for checkboxes */
interface CheckboxFieldProps {
  dict: DictCheckboxField;
  //errorMessages: string[];
}

/** Defines props for select inputs */
export type SelectableItem = keyof Omit<FormMap, 
  "ItemImage" |
  "ZonesBulk" |
  "AislesBulk" |
  "RacksBulk" |
  "ShelfsBulk" |
  "ProductImage" |
  "SupplierCode" |
  "Transaction"
>;

export interface SelectFieldProps<T extends SelectableItem> {
  name: T;
  list: FormMap[T][];
  errorMessages: string[];
  dict: DictSelectField;
}
export type SelectFieldPatternProps<T extends SelectableItem> = SelectFieldProps<T> & {
  element: FormMap[T]; // This would be used as a default value
  setElement: React.Dispatch<React.SetStateAction<FormMap[T]>>;
  //name: T;
  //list: FormMap[T][];
  //errorMessages: string[];
  //dict: DictSelectField;
};

/** Defines the props for an select field */
export interface SelectFieldPropsWithAdd<T extends SelectableItem> {
  addDialog: {
    self: {
      triggerType: "icon";
      dict: DictDialog;
    };
    formPattern: FormPropsMap[T];
  };
  selectField: SelectFieldProps<T>;
};


/** Maps every field */
export type FieldsPropsMap = {
  name: InputFieldProps;
  surname: InputFieldProps;
  description: InputFieldProps;
  identifier: InputFieldProps;
  code: InputFieldProps;
  email: InputFieldProps;

  quantity: InputFieldProps;
  length: InputFieldProps;
  width: InputFieldProps;
  heigth: InputFieldProps;
  weight: InputFieldProps;

  // Careful about this. I don't know if like this is okay.
  images: InputFieldProps;

  // Foreign keys
  zone: SelectFieldProps<"Zone">;
  aisle: SelectFieldProps<"Aisle">;
  rack: SelectFieldProps<"Rack">;
  shelf: SelectFieldProps<"Shelf">;

  category: SelectFieldProps<"Category">;
  subcategory: SelectFieldProps<"Subcategory">;

  item: SelectFieldProps<"Item">;
  variant: SelectFieldProps<"Variant">;


  client: SelectFieldProps<"Client">;
  product: SelectFieldProps<"Product">;
  user: SelectFieldProps<"User">;
  ticket: SelectFieldProps<"Ticket">;
  ticketType: SelectFieldProps<"TicketType">;
  ticketState: SelectFieldProps<"TicketState">;

  // Foreign keys with add
  zoneWithAdd: SelectFieldPropsWithAdd<"Zone">;
  aisleWithAdd: SelectFieldPropsWithAdd<"Aisle">;
  rackWithAdd: SelectFieldPropsWithAdd<"Rack">;
  shelfWithAdd: SelectFieldPropsWithAdd<"Shelf">;

  categoryWithAdd: SelectFieldPropsWithAdd<"Category">;
  subcategoryWithAdd: SelectFieldPropsWithAdd<"Subcategory">;

  clientWithAdd: SelectFieldPropsWithAdd<"Client">;

  // Button
  button: DictFormButton;

  isBusiness: CheckboxFieldProps;
  isDefaultVariant: CheckboxFieldProps;
  isArchived: CheckboxFieldProps;

  openDate: DictInputField;
  closeDate: DictInputField;
}

/** Creates a const with default fields that I can pass
*   to the different FormPattern so that I always have 
*   a default null on every field except the ones that
*   I want. */
type FieldsPropsNullMap = {
  [K in keyof FieldsPropsMap]: null;
}
export const fieldsDefaultProps: FieldsPropsNullMap = {
  name: null,
  surname: null,
  description: null,
  identifier: null,
  code: null,
  email: null,
  quantity: null,
  length: null,
  width: null,
  heigth: null,
  weight: null,
  images: null,
  zone: null,
  aisle: null,
  rack: null,
  shelf: null,
  category: null,
  subcategory: null,
  item: null,
  variant: null,
  client: null,
  product: null,
  user: null,
  ticket: null,
  ticketType: null,
  ticketState: null,
  zoneWithAdd: null,
  aisleWithAdd: null,
  rackWithAdd: null,
  shelfWithAdd: null,
  categoryWithAdd: null,
  subcategoryWithAdd: null,
  clientWithAdd: null,
  button: null,
  isBusiness: null,
  isDefaultVariant: null,
  isArchived: null,
  openDate: null,
  closeDate: null,
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
export type ZonesBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type AislesBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type RacksBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type ShelfsBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "rack" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}

export type ItemFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "isArchived" ? FieldsPropsMap[K] :
    K extends "zoneWithAdd" ? FieldsPropsMap[K] :
    K extends "aisleWithAdd" ? FieldsPropsMap[K] :
    K extends "rackWithAdd" ? FieldsPropsMap[K] :
    K extends "shelfWithAdd" ? FieldsPropsMap[K] :
    K extends "categoryWithAdd" ? FieldsPropsMap[K] :
    K extends "subcategoryWithAdd" ? FieldsPropsMap[K] :

    // K extends "identifier" ? FieldsPropsMap[K] :
    // K extends "quantity" ? FieldsPropsMap[K] :
    // K extends "length" ? FieldsPropsMap[K] :
    // K extends "width" ? FieldsPropsMap[K] :
    // K extends "heigth" ? FieldsPropsMap[K] :
    // K extends "weight" ? FieldsPropsMap[K] :
    // Used for the default variant

    // How do we handle JSON of Variants?
    // How do we handle fields for ItemImages?
    K extends "button" ? FieldsPropsMap[K] :
    null;
}

export type ItemCompleteFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "isArchived" ? FieldsPropsMap[K] :
    K extends "zoneWithAdd" ? FieldsPropsMap[K] :
    K extends "aisleWithAdd" ? FieldsPropsMap[K] :
    K extends "rackWithAdd" ? FieldsPropsMap[K] :
    K extends "shelfWithAdd" ? FieldsPropsMap[K] :
    K extends "categoryWithAdd" ? FieldsPropsMap[K] :
    K extends "subcategoryWithAdd" ? FieldsPropsMap[K] :

    K extends "images" ? FieldsPropsMap[K] :
    K extends "identifier" ? FieldsPropsMap[K] :
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "length" ? FieldsPropsMap[K] :
    K extends "width" ? FieldsPropsMap[K] :
    K extends "heigth" ? FieldsPropsMap[K] :
    K extends "weight" ? FieldsPropsMap[K] :
    // Used for the default variant

    // How do we handle JSON of Variants?
    // How do we handle fields for ItemImages?
    K extends "button" ? FieldsPropsMap[K] :
    null;
}

export type VariantFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "identifier" ? FieldsPropsMap[K] :

    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "length" ? FieldsPropsMap[K] :
    K extends "width" ? FieldsPropsMap[K] :
    K extends "heigth" ? FieldsPropsMap[K] :
    K extends "weight" ? FieldsPropsMap[K] :
    
    // How do we handle JSON of SupplierCode?
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type CategoryFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type SubcategoryFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "categoryWithAdd" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type ClientFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "surname" ? FieldsPropsMap[K] :
    K extends "isBusiness" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type ItemImageFormFieldsProps = {
  // This could be used to add new images in item/[slug]
  [K in keyof FieldsPropsMap]:
    K extends "images" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type ProductImageFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "images" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type ProductFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "clientWithAdd" ? FieldsPropsMap[K] :
    K extends "images" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type SupplierFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type SupplierCodeFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "code" ? FieldsPropsMap[K] :
    K extends "supplier" ? FieldsPropsMap[K] :
    K extends "item" ? FieldsPropsMap[K] :
    K extends "variant" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type TicketFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "open" ? FieldsPropsMap[K] :
    K extends "close" ? FieldsPropsMap[K] :
    K extends "client" ? FieldsPropsMap[K] :
    K extends "product" ? FieldsPropsMap[K] :
    K extends "type" ? FieldsPropsMap[K] :
    K extends "state" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type TransactionFormFieldsProps = {
  // Remember that the transaction type will be unchangeable
  [K in keyof FieldsPropsMap]:
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "ticket" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}
export type UserFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "name" ? FieldsPropsMap[K] :
    K extends "surname" ? FieldsPropsMap[K] :
    K extends "email" ? FieldsPropsMap[K] :
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
    K extends "ZonesBulk" ? ZonesBulkFormFieldsProps :
    K extends "AislesBulk" ? AislesBulkFormFieldsProps :
    K extends "RacksBulk" ? RacksBulkFormFieldsProps:
    K extends "ShelfsBulk" ? ShelfsBulkFormFieldsProps:
    K extends "Item" ? ItemFormFieldsProps :
    K extends "ItemComplete" ? ItemCompleteFormFieldsProps :
    K extends "Variant" ? VariantFormFieldsProps :
    K extends "Category" ? CategoryFormFieldsProps :
    K extends "Subcategory" ? SubcategoryFormFieldsProps :
    K extends "Client" ? ClientFormFieldsProps :
    K extends "ItemImage" ? ItemImageFormFieldsProps :
    K extends "ProductImage" ? ProductImageFormFieldsProps :
    K extends "Product" ? ProductFormFieldsProps :
    K extends "Supplier" ? SupplierFormFieldsProps :
    K extends "SupplierCode" ? SupplierCodeFormFieldsProps :
    K extends "Ticket" ? TicketFormFieldsProps :
    K extends "Transaction" ? TransactionFormFieldsProps :
    K extends "User" ? UserFormFieldsProps :
    never;
}

interface DictItemsForm {
  sections: {
    basics: string;
    defaultVariant: string;
    position: string;
    images: string;
    variants: string;
  }
}

interface DictVariantsForm {
  sections: {
    basics: string;
    codes: string;
    dimensions: string;
  }
}

type DictFormMap = {
  [K in keyof FormMap]: 
    K extends "Item" ? DictItemsForm :
    K extends "ItemComplete" ? DictItemsForm :
    K extends "Variant" ? DictVariantsForm :
    never;
}

export type FormFieldsPropsWithDictMap = {
  [K in keyof FormMap]: {
    dict?: DictFormMap[K];
    fields: FormFieldsPropsMap[K];
  }
}

export type FormFieldsPropsWithDictCompleteMap = {
  [K in keyof FormMap]: FormFieldsPropsWithDictMap[K] & {
    result?: FormMap[K];
    errorMessages: {
      [T in keyof FormMap[K]]: string[];
    }
  }
}
