import { TypeMap } from "../types/requests"

/** Maps keyof TypeMap to the string used to tag every request,
  * so that it can be used to revalidate if needed after a request.
  */
export const revalidateTags: Record<keyof TypeMap, string> = {
  // Positions
  "Zone": "zones",
  "Zones": "zones",
  "ZoneWithExtra": "zones",
  "ZonesWithExtra": "zones",

  "Aisle": "aisles",
  "Aisles": "aisles",
  "AisleWithExtra": "aisles",
  "AislesWithExtra": "aisles",

  "Rack": "racks",
  "Racks": "racks",
  "RackWithExtra": "racks",
  "RacksWithExtra": "racks",

  "Shelf": "shelfs",
  "Shelfs": "shelfs",
  "ShelfWithExtra": "shelfs",
  "ShelfsWithExtra": "shelfs",

  // Tag
  "Category": "categories",
  "Categories": "categories",

  "Subcategory": "subcategories",
  "Subcategories": "subcategories",

  // Supplier
  "Supplier": "suppliers",
  "Suppliers": "suppliers",
  "SupplierWithExtra": "suppliers",
  "SuppliersWithExtra": "suppliers",
  
  "SupplierCode": "supplier-codes",
  "SupplierCodes": "supplier-codes",
  "SupplierCodeWithExtra": "supplier-codes",
  "SupplierCodesWithExtra": "supplier-codes",
  "ItemWithSupplierCodes": "supplier-codes",

  // Item
  "Item": "items",
  "Items": "items",

  "ItemImage": "item-images",
  "ItemImagesPostBody": "item-images",
  "ItemImages": "item-images",

  "Transaction": "transitions",
  "Transactions": "transitions",

  "Variant": "variants",
  "Variants": "variants",

  // Tickets
  "Ticket": "tickets",
  "Tickets": "tickets",

  "TicketType": "ticket-types",
  "TicketTypes": "ticket-types",

  "TicketState": "ticket-states",
  "TicketStates": "ticket-states",

  "Product": "products",
  "Products": "products",

  "ProductImage": "product-images",
  "ProductImagesPostBody": "product-images",
  "ProductImages": "product-images",

  "Client": "clients",
  "Clients": "clients",

  // User
  "User": "users",
  "Users": "users",
}

//export const asdf: Record<keyof TypeMap, >
