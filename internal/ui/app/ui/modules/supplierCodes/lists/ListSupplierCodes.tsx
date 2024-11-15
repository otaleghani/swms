// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import FilterSupplierCodes from "@/app/ui/patterns/filter/data/FilterSupplierCodes";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import ListSupplierCodesClient from "./ListSupplierCodesClient";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Supplier, Suppliers } from "@/app/lib/types/data/suppliers";
import { SupplierCodes } from "@/app/lib/types/data/supplierCodes";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Items } from "@/app/lib/types/data/items";
import { Variants } from "@/app/lib/types/data/variants";

type Props =
  | {
      hideFilters: {
        supplier?: boolean;
        item?: boolean;
        variant?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["supplierCodes"];
      locale: Locale;
      type: "complete";
      forceLayout: "list" | "dynamic";
    }
  | {
      hideFilters: {
        supplier?: boolean;
        item?: boolean;
        variant?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["supplierCodes"];
      locale: Locale;
      type: "supplier";
      supplier: Supplier;
      forceLayout: "list" | "dynamic";
  };

export default async function ListSupplierCodes(props: Props) {
  const { searchParams, locale, type, hideFilters, forceLayout } = props;
  let currentSupplier;

  let pList;
  if (type === "supplier") {
    const { supplier } = props;
    currentSupplier = supplier;

    pList = retrieveByForeignId({
      request: "SupplierCodes",
      foreign: "Supplier",
      id: supplier.id as string,
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  } else {
    pList = retrieve({
      request: "SupplierCodes",
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  }
  const pDict = getDictionary(locale);

  const pSuppliers = retrieve({ request: "Suppliers", paginationOff: "true" });
  const pItems = retrieve({ request: "Items", paginationOff: "true" });
  const pVariants = retrieve({ request: "Variants", paginationOff: "true" });
  const pSupplierCodes = retrieve({ request: "SupplierCodes", paginationOff: "true" });

  const [list, dict, suppliers, items, variants, supplierCodes] 
    = await Promise.all([pList, pDict, pSuppliers, pItems, pVariants, pSupplierCodes])

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="h-full">
        <div className={`grid gap-2 p-4 ${
          forceLayout === "list"
          ? "xl:grid-cols-1"
          : searchParams?.pagination?.layout
            ? `${gridCols[searchParams.pagination.layout]}`
            : "xl:grid-cols-3"
        }`}>
          {type === "complete" && (
            <ListSupplierCodesClient 
              type={type}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              supplierCodes={list.data as SupplierCodes}
              dictDialogEdit={dict.supplierCode.dialogs.edit}
              dictDialogReplace={dict.supplierCode.dialogs.replace}
              dictCard={dict.supplierCode.card}
              dictNotFound={dict.misc.notFound}
              fields={{
                code: { dict: dict.form.fields.name },
                button: dict.form.buttons.submit,
                supplier: { 
                  dict: dict.form.fields.suppliers,
                  list: suppliers.data as Suppliers,
                  name: "Supplier",
                },
                item: { 
                  dict: dict.form.fields.items,
                  list: items.data as Items,
                  name: "Item",
                },
                variant: { 
                  dict: dict.form.fields.variants,
                  list: variants.data as Variants,
                  name: "Variant",
                },
              }}
            />
          )}
          {type === "supplier" && (
            <ListSupplierCodesClient 
              type={type}
              supplier={currentSupplier as Supplier}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              supplierCodes={list.data as SupplierCodes}
              dictDialogEdit={dict.supplierCode.dialogs.edit}
              dictDialogReplace={dict.supplierCode.dialogs.replace}
              dictCard={dict.supplierCode.card}
              dictNotFound={dict.misc.notFound}
              fields={{
                code: { dict: dict.form.fields.name },
                button: dict.form.buttons.submit,
                supplier: { 
                  dict: dict.form.fields.suppliers,
                  list: suppliers.data as Suppliers,
                  name: "Supplier",
                },
                item: { 
                  dict: dict.form.fields.items,
                  list: items.data as Items,
                  name: "Item",
                },
                variant: { 
                  dict: dict.form.fields.variants,
                  list: variants.data as Variants,
                  name: "Variant",
                },
              }}
            />
          )}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterSupplierCodes
          dict={dict.filters}
          fields={{
            suppliers: {
              list: suppliers.data as Suppliers,
              dict: dict.form.fields.suppliers
            },
            items: {
              list: items.data as Items,
              dict: dict.form.fields.items,
            },
            variants: {
              list: variants.data as Variants,
              dict: dict.form.fields.variants,
            },
            search: {
              dict: dict.form.fields.search
            }
          }}
          hide={hideFilters}
        />
        <PaginationPattern 
          forceLayout={forceLayout}
          totalPages={list.totalPages as number} 
          type="supplierCodes"
        />
      </div>
    </>
  )
}
