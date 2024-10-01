
"use client" 

/** React hooks */
import { useState } from "react";

/** Local components */
import SelectFieldPattern from "./SelectFieldPattern";

import { emptyProduct } from "@/app/lib/types/data/products";
import { SelectableItem, SelectFieldProps } from "@/app/lib/types/form/fields";
import { FormMap } from "@/app/lib/types/form/form";
import { emptyZone } from "@/app/lib/types/data/zones";
import { emptyAisle } from "@/app/lib/types/data/aisles";
import { emptyRack } from "@/app/lib/types/data/racks";
import { emptyShelf } from "@/app/lib/types/data/shelfs";
import { emptyCategory } from "@/app/lib/types/data/categories";
import { emptySubcategory } from "@/app/lib/types/data/subcategories";
import { emptyClient } from "@/app/lib/types/data/clients";
import { emptySupplier } from "@/app/lib/types/data/suppliers";
import { emptyTicket, emptyTicketState, emptyTicketType } from "@/app/lib/types/data/tickets";
import { emptyUser } from "@/app/lib/types/data/users";
import { emptyItem } from "@/app/lib/types/data/items";
import { emptyVariant } from "@/app/lib/types/data/variants";

//type EmptyMap = {
//  [K in SelectableItem]: FormMap[K];
//}

const emptyMap: FormMap = {
  Zone: emptyZone,
  Aisle: emptyAisle,
  Rack: emptyRack,
  Shelf: emptyShelf,
  Category: emptyCategory,
  Subcategory: emptySubcategory,
  Product: emptyProduct,
  Client: emptyClient,
  Supplier: emptySupplier,
  Ticket: emptyTicket,
  TicketType: emptyTicketType,
  TicketState: emptyTicketState,
  User: emptyUser,
  Item: emptyItem,
  Variant: emptyVariant,

  ZonesBulk: {} as any,
  AislesBulk: {} as any,
  RacksBulk: {} as any,
  ShelfsBulk: {} as any,
  SupplierCode: {} as any,
  ItemComplete: {} as any,
  ItemImage: {} as any,
  ProductImage: {} as any,
  Transaction: {} as any,
  ProductWithImages: {} as any,
}

export type GenericSelectFieldsProps<K extends SelectableItem> = {
  errorMessages: string[];
  selectField: SelectFieldProps<K>;
}

export default function ProductSelectFields<K extends SelectableItem>({
  errorMessages,
  selectField,
}: GenericSelectFieldsProps<K>) {
  const [selectedObject, setSelectedObject] = useState(emptyMap[selectField.name]);

  return (
    <div>
      <div>
        <div className="flex gap-4 items-end">
          <SelectFieldPattern<K> 
            name={selectField.name}
            element={selectedObject}
            setElement={setSelectedObject}
            list={selectField.list}
            errorMessages={errorMessages}
            dict={selectField.dict}
          />
        </div>
        
      </div>
    </div>
  )
}
