// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FilterSuppliers from "@/app/ui/patterns/filter/data/FilterSuppliers";
import ListSuppliersWithExtraClient from "./ListSuppliersWithExtraClient";

// Types and interfaces
import { SuppliersWithExtra } from "@/app/lib/types/data/suppliers";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";

interface Props {
  searchParams?: SearchParams["suppliers"];
  locale: Locale;
}

export default async function ListSuppliersWithExtra({
  searchParams,
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const suppliers = await retrieve({
    request: "Suppliers",
    paginationOff: "true",
  });

  const list = await retrieve({
    request: "SuppliersWithExtra",
    page: searchParams?.pagination?.page,
    perPage: searchParams?.pagination?.perPage,
    filters: JSON.stringify(searchParams?.filters),
  });

  return (
    <>
      <ScrollArea
        scrollHideDelay={10000}
        className="xl:h-[calc(100vh_-_114px)] "
      >
        <div
          className={`grid gap-2 p-4 ${
            searchParams?.pagination?.layout
              ? `${gridCols[searchParams.pagination.layout]}`
              : "xl:grid-cols-3"
          }`}
        >
          <ListSuppliersWithExtraClient
            filters={searchParams?.filters}
            pagination={searchParams?.pagination}
            suppliersWithExtra={list.data as SuppliersWithExtra}
            dictDialogReplace={dict.supplier.dialogs.replace}
            dictDialogEdit={dict.supplier.dialogs.edit}
            dictCard={dict.supplier.card}
            dictNotFound={dict.misc.notFound}
            fields={{
              name: { dict: dict.form.fields.name },
              description: { dict: dict.form.fields.description },
              button: dict.form.buttons.submit,
              supplier: {
                list: suppliers.data ? suppliers.data : [],
                name: "Supplier",
                dict: dict.form.fields.suppliers,
              },
            }}
          />
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterSuppliers
          dict={dict.filters}
          fields={{
            search: {
              dict: dict.form.fields.search,
            },
          }}
        />
        <PaginationPattern
          forceLayout="dynamic"
          totalPages={list.totalPages as number}
          type="suppliers"
        />
      </div>
    </>
  );
}
