import { Dispatch, SetStateAction } from "react";
import { FormFieldsPropsMap, FormFieldsPropsWithDictMap } from "./fields";

import { Zone, ZonesBulkPostRequestBody } from "../data/zones";
import { Aisle, AislesBulkPostRequestBody } from "../data/aisles";
import { Rack, RacksBulkPostRequestBody } from "../data/racks";
import { Shelf, ShelfsBulkPostRequestBody } from "../data/shelfs";
import { Item, ItemWithDefaultVariantAndImages } from "../data/items";
import { Category } from "../data/categories";
import { Subcategory } from "../data/subcategories";
import { Client } from "../data/clients";
import { 
  ItemImage, 
  ItemImagesPostBody, 
  ProductImage, 
  ProductImagesPostBody 
} from "../data/images";
import { Product, ProductWithImages } from "../data/products";
import { Supplier } from "../data/suppliers";
import { SupplierCode } from "../data/supplierCodes";
import { Ticket, TicketState, TicketType } from "../data/tickets";
import { Operation } from "../data/operations";
import { User } from "../data/users";
import { Variant } from "../data/variants";
import { LoginRequestBody, RegisterRequestBody } from "../../types/data/auth";
import { Unit } from "../data/units";

// Lists all the possible forms
// maps every request body  
export interface FormMap {
  Login: LoginRequestBody;
  Register: RegisterRequestBody;

  Zone: Zone;
  Aisle: Aisle;
  Rack: Rack;
  Shelf: Shelf;

  ZonesBulk: ZonesBulkPostRequestBody;
  AislesBulk: AislesBulkPostRequestBody;
  RacksBulk: RacksBulkPostRequestBody;
  ShelfsBulk: ShelfsBulkPostRequestBody;
  
  Item: Item;
  Variant: Variant;
  //ItemImage: ItemImage;
  ItemImage: ItemImagesPostBody;
  ItemComplete: ItemWithDefaultVariantAndImages;

  Category: Category;
  Subcategory: Subcategory;

  Product: Product;
  ProductWithImages: ProductWithImages;
  //ProductImage: ProductImage;
  ProductImage: ProductImagesPostBody;
  Client: Client;
  Supplier: Supplier;
  SupplierCode: SupplierCode;
  Ticket: Ticket;
  TicketType: TicketType;
  TicketState: TicketState;
  Operation: Operation;
  User: User;

  Delete: {
    id: string;
    type: string;
  };
  Replace: {
    itemToDelete: string;
    itemThatReplaces: string;
    type: string;
  }

  Unit: Unit;
}

export interface FormState<X extends keyof FormMap> {
  error: boolean;
  message: string;
  result?: FormMap[X];
  errorMessages: {
    [T in keyof FormFieldsPropsMap[X] as 
      FormFieldsPropsMap[X][T] extends null ? never : 
        T extends "button" ? never :
        T 
      ]: string[];
  };
  misc?: any;
}

interface FormProps<T extends keyof FormMap> {
  formName: string;
  initialState: FormState<T>;
  formAction: (
    currentState: FormState<T>,
    formData: FormData,
  ) => Promise<FormState<any>>;
  notifyFormSent?: Dispatch<SetStateAction<boolean>>;
  refreshItemList?: (item: FormMap[T]) => void;
}

export type FormPropsMap = {
  [K in keyof FormMap]: {
    self: FormFieldsPropsWithDictMap[K];
    form: FormProps<K>
    type: K;
  }
}
