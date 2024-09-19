import { 
  Zone, 
  Zones, 
  ZoneWithExtra,
  ZonesWithExtra 
} from "./data/zones";

import { 
  Aisle, 
  Aisles, 
  AisleWithExtra,
  AislesWithExtra 
} from "./data/aisles";

import { 
  Rack, 
  Racks, 
  RacksWithExtra, 
  RackWithExtra 
} from "./data/racks";

import { 
  Shelf, 
  Shelfs, 
  ShelfsWithExtra, 
  ShelfWithExtra 
} from "./data/shelfs";

import { 
  ItemWithSupplierCodes, 
  SupplierCode, 
  SupplierCodes, 
  SupplierCodesWithExtra, 
  SupplierCodeWithExtra 
} from "./data/supplierCodes";

import { 
  Ticket, 
  Tickets, 
  TicketState, 
  TicketStates, 
  TicketType, 
  TicketTypes 
} from "./data/tickets";

import { 
  Supplier, 
  Suppliers, 
  SuppliersWithExtra, 
  SupplierWithExtra 
} from "./data/suppliers";

import { 
  Categories, 
  Category 
} from "./data/categories";

import { 
  ItemImage, 
  ItemImages, 
  ProductImage,
  ProductImages
} from "./data/images";
import { 
  Item, 
  Items 
} from "./data/items";

import { 
  Product, 
  Products 
} from "./data/products";

import { 
  Subcategories, 
  Subcategory 
} from "./data/subcategories";

import { 
  Transition, 
  Transitions 
} from "./data/transitions";

import { 
  User, 
  Users 
} from "./data/users";

import { 
  Variant, 
  Variants 
} from "./data/variants";
import { Client, Clients } from "./data/clients";

/** Maps every type that can be the body of the return of Response<Entity>
  */
export type TypeMap = {
  // Positions
  Zone: Zone;
  Zones: Zones;
  ZoneWithExtra: ZoneWithExtra;
  ZonesWithExtra: ZonesWithExtra;

  Aisle: Aisle;
  Aisles: Aisles;
  AisleWithExtra: AisleWithExtra;
  AislesWithExtra: AislesWithExtra;

  Rack: Rack;
  Racks: Racks;
  RackWithExtra: RackWithExtra;
  RacksWithExtra: RacksWithExtra;

  Shelf: Shelf;
  Shelfs: Shelfs;
  ShelfWithExtra: ShelfWithExtra;
  ShelfsWithExtra: ShelfsWithExtra;

  // Tag
  Category: Category;
  Categories: Categories;

  Subcategory: Subcategory;
  Subcategories: Subcategories;

  // Supplier
  Supplier: Supplier;
  Suppliers: Suppliers;
  SupplierWithExtra: SupplierWithExtra;
  SuppliersWithExtra: SuppliersWithExtra;
  
  SupplierCode: SupplierCode;
  SupplierCodes: SupplierCodes;
  SupplierCodeWithExtra: SupplierCodeWithExtra;
  SupplierCodesWithExtra: SupplierCodesWithExtra;
  ItemWithSupplierCodes: ItemWithSupplierCodes;

  // Item
  Item: Item;
  Items: Items;

  ItemImage: ItemImage;
  ItemImages: ItemImages;

  Transition: Transition;
  Transitions: Transitions;

  Variant: Variant;
  Variants: Variants;

  // Tickets
  Ticket: Ticket;
  Tickets: Tickets;
  TicketType: TicketType;
  TicketTypes: TicketTypes;
  TicketState: TicketState;
  TicketStates: TicketStates;

  Product: Product;
  Products: Products;

  ProductImage: ProductImage;
  ProductImages: ProductImages;

  Client: Client;
  Clients: Clients;

  // User
  User: User;
  Users: Users;
}
export type ValidType<K extends string> = K extends keyof TypeMap ? K : never;

/** Used to define the request options, so the parameters used 
  * to make said request.
  *
  * @type defines the return type of the function
  * */
export type RequestOptions = {
  path: string;
  type: keyof TypeMap;
}

export type TypeMapFilterSingles = {
  [K in Extract<keyof TypeMap,
    "Zone" |
    "ZoneWithExtra" |
    "Aisle" |
    "AisleWithExtra" |
    "Rack" |
    "RackWithExtra" |
    "Shelf" |
    "ShelfWithExtra" |
    "Category" |
    "Subcategory" |
    "Supplier" |
    "SupplierWithExtra" |
    "SupplierCode" |
    "SupplierCodeWithExtra" |
    "Item" |
    "ItemImage" |
    "Transition" |
    "Variant" |
    "Ticket" |
    "TicketType" |
    "TicketState" |
    "Product" |
    "ProductImage" |
    "Client" |
    "User"
  >]: null;
}

export type TypeMapFilterLists = {
  [K in Exclude<keyof TypeMap, keyof TypeMapFilterSingles>]: null;
}
