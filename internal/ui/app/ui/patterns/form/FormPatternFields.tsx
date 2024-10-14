/** Local components */
import { ZoneFormFields, ZonesBulkFormFields } from "./fields/zones";
import { AisleFormFields, AislesBulkFormFields } from "./fields/aisles";
import { RackFormFields, RacksBulkFormFields } from "./fields/racks";
import { ShelfFormFields, ShelfsBulkFormFields } from "./fields/shelfs";
import { CategoryFormFields } from "./fields/categories";
import { SubcategoryFormFields } from "./fields/subcategories";
import { ClientFormFields } from "./fields/clients";
import { ProductFormFields } from "./fields/products";
import { ProductImagesFormFields } from "./fields/productImages";
import { TicketFormFields } from "./fields/tickets";
import { TicketStateFormFields } from "./fields/ticketState";
import { TicketTypeFormFields } from "./fields/ticketType";
import { SupplierFormFields } from "./fields/suppliers";
import { SupplierCodeFormFields } from "./fields/supplierCodes";
import { ItemCompleteFormFields } from "./fields/items";
import { VariantsFormFields } from "./fields/variants";
import { TransactionFormFields } from "./fields/transactions";
import { UserFormFields } from "./fields/users";
import { ReplaceFormFields } from "./fields/replace";

export {
  ZoneFormFields as Zone,
  ZonesBulkFormFields as ZonesBulk,

  AisleFormFields as Aisle,
  AislesBulkFormFields as AislesBulk,

  RackFormFields as Rack,
  RacksBulkFormFields as RacksBulk,

  ShelfFormFields as Shelf,
  ShelfsBulkFormFields as ShelfsBulk,

  CategoryFormFields as Category,
  SubcategoryFormFields as Subcategory,

  ClientFormFields as Client,
  ProductFormFields as Product,
  ProductImagesFormFields as ProductImages,

  TicketFormFields as Ticket,
  TicketStateFormFields as TicketState,
  TicketTypeFormFields as TicketType,

  SupplierFormFields as Supplier,
  SupplierCodeFormFields as SupplierCode,

  ItemCompleteFormFields as ItemComplete,
  VariantsFormFields as Variants,
  TransactionFormFields as Transaction,

  UserFormFields as User,

  ReplaceFormFields as Replace,
}
