import {
  DictCheckboxField,
  DictDatePickerField,
  DictFormButton,
  DictInputField,
  DictSelectField,
} from "../dictionary/form";
import { FormMap } from "./form";
import { DialogFormPatternProps } from "@/app/ui/patterns/dialog/DialogFormPattern";

/** Defines the props for an input field */
interface InputFieldProps {
  dict: DictInputField;
}

interface DatePickerProps {
  dict: DictDatePickerField;
}

/** Defines the props for a JSON field */
interface JSONHiddenFieldProps {
  data: string;
}

/** Defines the props for checkboxes */
interface CheckboxFieldProps {
  dict: DictCheckboxField;
}

/** Defines props for select inputs */
export type SelectableItem = keyof Omit<
  FormMap,
  | "ItemImage"
  | "ZonesBulk"
  | "AislesBulk"
  | "RacksBulk"
  | "ShelfsBulk"
  | "ProductImage"
  | "SupplierCode"
  | "ItemComplete"
  | "ItemCompleteFormFieldsProps"
  | "Operation"
  | "ProductWithImages"
  | "Delete"
  | "Replace"
  | "Login"
  | "Register"
>;

/**
 * Usually used by the component that is rendering
 * <SelectFieldPattern />. The idea is that the parent component would
 * be the one taking care of the state of the select field.
 */
export interface SelectFieldProps<T extends SelectableItem> {
  name: T;
  list: FormMap[T][];
  dict: DictSelectField;
}

/**
 * Props used by <SelectFieldPattern />
 */
export type SelectFieldPatternProps<T extends SelectableItem> =
  SelectFieldProps<T> & {
    element: FormMap[T]; // This would be used as a default value
    setElement: React.Dispatch<React.SetStateAction<FormMap[T]>>;
  };

/** Defines the props for an select field */
export interface SelectFieldPropsWithAdd<T extends SelectableItem> {
  addDialog: DialogFormPatternProps<T>;
  selectField: SelectFieldProps<T>;
}

export type SelectFieldPatternWithAddProps<T extends SelectableItem> =
  SelectFieldPropsWithAdd<T> & {
    element: FormMap[T]; // This would be used as a default value
    setElement: React.Dispatch<React.SetStateAction<FormMap[T]>>;
};

/** Maps every field */
export type FieldsPropsMap = {
  email: InputFieldProps;
  password: InputFieldProps;

  name: InputFieldProps;
  surname: InputFieldProps;
  description: InputFieldProps;
  identifier: InputFieldProps;
  code: InputFieldProps;

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

  supplier: SelectFieldProps<"Supplier">;
  supplierWithAdd: SelectFieldPropsWithAdd<"Supplier">;

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
  ticketTypeWithAdd: SelectFieldPropsWithAdd<"TicketType">;
  ticketStateWithAdd: SelectFieldPropsWithAdd<"TicketState">;

  // Button
  button: DictFormButton;

  isBusiness: CheckboxFieldProps;
  isDefaultVariant: CheckboxFieldProps;
  isArchived: CheckboxFieldProps;

  openDate: DatePickerProps;
  closeDate: DatePickerProps;

  variantsJSON: JSONHiddenFieldProps;
  codesJSON: JSONHiddenFieldProps;

  id: string;
};

/** Creates a const with default fields that I can pass
 *   to the different FormPattern so that I always have
 *   a default null on every field except the ones that
 *   I want. */
type FieldsPropsNullMap = {
  [K in keyof FieldsPropsMap]: null;
};
export const fieldsDefaultProps: FieldsPropsNullMap = {
  email: null,
  password: null,
  name: null,
  surname: null,
  description: null,
  identifier: null,
  code: null,
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
  ticketTypeWithAdd: null,
  ticketStateWithAdd: null,
  button: null,
  isBusiness: null,
  isDefaultVariant: null,
  isArchived: null,
  openDate: null,
  closeDate: null,
  supplier: null,
  supplierWithAdd: null,
  codesJSON: null,
  variantsJSON: null,
  id: null,
};

/** Defines the fields for each type. */
// prettier-ignore
export type ZoneFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type AisleFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type RackFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ShelfFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "rack" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ZonesBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type AislesBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type RacksBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ShelfsBulkFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "zone" ? FieldsPropsMap[K] :
    K extends "aisle" ? FieldsPropsMap[K] :
    K extends "rack" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
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
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
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
    K extends "variantsJSON" ? FieldsPropsMap[K] :
    K extends "codesJSON" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type VariantFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "identifier" ? FieldsPropsMap[K] :
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "length" ? FieldsPropsMap[K] :
    K extends "width" ? FieldsPropsMap[K] :
    K extends "heigth" ? FieldsPropsMap[K] :
    K extends "weight" ? FieldsPropsMap[K] : // How do we handle JSON of SupplierCode?
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type CategoryFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type SubcategoryFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "category" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ClientFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "surname" ? FieldsPropsMap[K] :
    K extends "isBusiness" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ItemImageFormFieldsProps = {
  // This could be used to add new images in item/[slug]
  [K in keyof FieldsPropsMap]: 
    K extends "images" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ProductImageFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "images" ? FieldsPropsMap[K] :
    K extends "product" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ProductFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "clientWithAdd" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ProductWithImagesFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "clientWithAdd" ? FieldsPropsMap[K] :
    K extends "images" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type SupplierFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type SupplierCodeFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "code" ? FieldsPropsMap[K] :
    K extends "supplierWithAdd" ? FieldsPropsMap[K] :
    K extends "supplier" ? FieldsPropsMap[K] :
    K extends "item" ? FieldsPropsMap[K] :
    K extends "variant" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type TicketFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "openDate" ? FieldsPropsMap[K] :
    K extends "closeDate" ? FieldsPropsMap[K] :
    K extends "client" ? FieldsPropsMap[K] :
    K extends "product" ? FieldsPropsMap[K] :
    K extends "ticketType" ? FieldsPropsMap[K] :
    K extends "ticketState" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type TicketStateFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type TicketTypeFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "description" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type OperationFormFieldsProps = {
  // Remember that the transaction type will be unchangeable
  [K in keyof FieldsPropsMap]: 
    K extends "quantity" ? FieldsPropsMap[K] :
    K extends "ticket" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type UserFormFieldsProps = {
  [K in keyof FieldsPropsMap]: 
    K extends "name" ? FieldsPropsMap[K] :
    K extends "surname" ? FieldsPropsMap[K] :
    K extends "email" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type DeleteFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type ReplaceFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "zone" ? FieldsPropsMap[K] | null :
    K extends "aisle" ? FieldsPropsMap[K] | null :
    K extends "rack" ? FieldsPropsMap[K] | null :
    K extends "shelf" ? FieldsPropsMap[K] | null :
    K extends "category" ? FieldsPropsMap[K] | null :
    K extends "subcategory" ? FieldsPropsMap[K] | null :
    K extends "id" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
};

// prettier-ignore
export type LoginFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "email" ? FieldsPropsMap[K] :
    K extends "password" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}

export type RegisterFormFieldsProps = {
  [K in keyof FieldsPropsMap]:
    K extends "email" ? FieldsPropsMap[K] :
    K extends "password" ? FieldsPropsMap[K] :
    K extends "name" ? FieldsPropsMap[K] :
    K extends "surname" ? FieldsPropsMap[K] :
    K extends "button" ? FieldsPropsMap[K] :
    null;
}

// prettier-ignore
/** Maps every fields for each type */
export type FormFieldsPropsMap = {
  [K in keyof FormMap]: 
    K extends "Zone" ? ZoneFormFieldsProps :
    K extends "Aisle" ? AisleFormFieldsProps :
    K extends "Rack" ? RackFormFieldsProps :
    K extends "Shelf" ? ShelfFormFieldsProps :
    K extends "ZonesBulk" ? ZonesBulkFormFieldsProps :
    K extends "AislesBulk" ? AislesBulkFormFieldsProps :
    K extends "RacksBulk" ? RacksBulkFormFieldsProps :
    K extends "ShelfsBulk" ? ShelfsBulkFormFieldsProps :
    K extends "Item" ? ItemFormFieldsProps :
    K extends "ItemComplete" ? ItemCompleteFormFieldsProps :
    K extends "Variant" ? VariantFormFieldsProps :
    K extends "Category" ? CategoryFormFieldsProps :
    K extends "Subcategory" ? SubcategoryFormFieldsProps :
    K extends "Client" ? ClientFormFieldsProps :
    K extends "ItemImage" ? ItemImageFormFieldsProps :
    K extends "ProductImage" ? ProductImageFormFieldsProps :
    K extends "Product" ? ProductFormFieldsProps :
    K extends "ProductWithImages" ? ProductWithImagesFormFieldsProps :
    K extends "Supplier" ? SupplierFormFieldsProps :
    K extends "SupplierCode" ? SupplierCodeFormFieldsProps :
    K extends "Ticket" ? TicketFormFieldsProps :
    K extends "TicketState" ? TicketStateFormFieldsProps :
    K extends "TicketType" ? TicketTypeFormFieldsProps :
    K extends "Operation" ? OperationFormFieldsProps :
    K extends "User" ? UserFormFieldsProps :
    K extends "Delete" ? DeleteFormFieldsProps :
    K extends "Replace" ? ReplaceFormFieldsProps :
    K extends "Login" ? LoginFormFieldsProps :
    K extends "Register" ? RegisterFormFieldsProps :
    null;
};

interface DictItemsForm {
  sections: {
    basics: string;
    defaultVariant: string;
    position: string;
    images: string;
    variants: string;
  };
}

interface DictVariantsForm {
  sections: {
    basics: string;
    codes: string;
    dimensions: string;
  };
}

// prettier-ignore
type DictFormMap = {
  [K in keyof FormMap]: 
    K extends "Item" ? DictItemsForm :
    K extends "ItemComplete"? DictItemsForm :
    K extends "Variant" ? DictVariantsForm :
    never;
};

export type FormFieldsPropsWithDictMap = {
  [K in keyof FormMap]: {
    dict?: DictFormMap[K];
    fields: FormFieldsPropsMap[K];
  };
};

//type FormFieldsPropsMap = {
export type FormFieldsPropsWithDictCompleteMap = {
  [K in keyof FormMap]: FormFieldsPropsWithDictMap[K] & {
    result?: FormMap[K];
    errorMessages: {
      //[T in keyof FormMap[K]]: string[];
      [T in keyof FormFieldsPropsMap[K] as 
        FormFieldsPropsMap[K][T] extends null ? never : 
          T extends "button" ? never :
          T 
        ]: string[];
    };
  };
};
