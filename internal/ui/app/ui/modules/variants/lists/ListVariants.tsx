import { retrieve } from "@/app/lib/requests/generics/retrieve"
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";
import { Item, Items } from "@/app/lib/types/data/items";
import { SearchParams } from "@/app/lib/types/pageParams";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { ScrollArea } from "@/app/ui/components/scroll-area";
import ListVariantsClient from "./ListVariantsClient";
import { Variants } from "@/app/lib/types/data/variants";
import { Unit } from "@/app/lib/types/data/units";
import FilterVariants from "@/app/ui/patterns/filter/data/FilterVariants";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import { SupplierCodes } from "@/app/lib/types/data/supplierCodes";
import { Suppliers } from "@/app/lib/types/data/suppliers";

interface Props {
  hideFilters: {
    search?: boolean;
    item?: boolean;
  };
  searchParams?: SearchParams["variants"];
  locale: Locale;
  item: Item,
}

export default async function ListVariants({
  hideFilters,
  searchParams,
  item,
  locale,
}: Props) {
  const pDict = getDictionary(locale);
  const pUnits = retrieve({ request: "Units", paginationOff: "true" });
  const pItems = retrieve({ request: "Items", paginationOff: "true" });
  const pSuppliers = retrieve({ request: "Suppliers", paginationOff: "true" });
  const pVariants = retrieveByForeignId({
    request: "Variants",
    foreign: "Item",
    id: item.id as string,
    page: searchParams?.pagination?.page,
    perPage: searchParams?.pagination?.perPage,
    filters: JSON.stringify(searchParams?.filters),
  });
  const pCodes = retrieveByForeignId({
    request: "SupplierCodes",
    foreign: "Item",
    id: item.id as string,
  });

  const [units, dict, variants, items, suppliers, codes] = 
    await Promise.all([pUnits, pDict, pVariants, pItems, pSuppliers, pCodes]);

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="h-full">
        <div className={"grid gap-2 p-4 xl:grid-cols-1"}>
          <ListVariantsClient 
            item={item}
            pagination={searchParams?.pagination}
            filters={searchParams?.filters}
            variants={variants.data as Variants}
            codes={codes.data  as SupplierCodes}
            dictDialogEdit={dict.variant.dialogs.edit}
            dictDialogDelete={dict.variant.dialogs.delete}
            dictCard={dict.variant.card}
            dictNotFound={dict.misc.notFound}
            fields={{
              name: { dict: dict.form.fields.name },
              description: { dict: dict.form.fields.description },
              identifier: { dict: dict.form.fields.identifier },
              length: { dict: dict.form.fields.length },
              width: { dict: dict.form.fields.width },
              height: { dict: dict.form.fields.height },
              weight: { dict: dict.form.fields.weight },
              quantity: { dict: dict.form.fields.quantity },
              lengthUnit: { 
                dict: dict.form.fields.zones,
                list: units.data?.filter(item => item.type === "length") as Unit[],
                name: "Unit",
              },
              weightUnit: { 
                dict: dict.form.fields.aisles,
                list: units.data?.filter(item => item.type === "weight") as Unit[],
                name: "Unit",
              },
              item: { 
                dict: dict.form.fields.items,
                list: items.data as Items,
                name: "Item",
              },
              button: dict.form.buttons.submit,
            }}
            supplierCodeCard={{
              dialogCreate: {
                fields: {
                  code: { dict: dict.form.fields.identifier },
                  supplier: { 
                    dict: dict.form.fields.suppliers,
                    name: "Supplier",
                    list: suppliers.data as Suppliers
                  },
                  item: { 
                    dict: dict.form.fields.items,
                    name: "Item",
                    list: [],
                  },
                  variant: { 
                    dict: dict.form.fields.variants,
                    name: "Variant",
                    list: [],
                  },
                  button: dict.form.buttons.submit,
                },
                dict: dict.supplierCode.dialogs.add,
              },
              dialogEdit: {
                fields: {
                  code: { dict: dict.form.fields.identifier },
                  supplier: { 
                    dict: dict.form.fields.suppliers,
                    name: "Supplier",
                    list: suppliers.data as Suppliers
                  },
                  item: { 
                    dict: dict.form.fields.items,
                    name: "Item",
                    list: [],
                  },
                  variant: { 
                    dict: dict.form.fields.variants,
                    name: "Variant",
                    list: [],
                  },
                  button: dict.form.buttons.submit,
                },
                dict: dict.supplierCode.dialogs.add,
              },
              dialogDelete: {
                fields: {
                  button: dict.form.buttons.submit,
                },
                dict: dict.supplierCode.dialogs.add,
              }
            }}
          />
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterVariants
          dict={dict.filters}
          fields={{
            items: {
              list: items.data as Items,
              dict: dict.form.fields.items
            },
            search: {
              dict: dict.form.fields.search
            }
          }}
          hide={hideFilters}
        />
        <PaginationPattern 
          forceLayout="list"
          totalPages={variants.totalPages as number} 
          type="aisles"
        />
      </div>
    </>
  )
}
