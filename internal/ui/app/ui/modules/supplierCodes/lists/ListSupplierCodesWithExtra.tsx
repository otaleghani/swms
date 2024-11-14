// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FilterSupplierCodes from "@/app/ui/patterns/filter/data/FilterSupplierCodes";
import ListSupplierCodesWithExtraClient from "./ListSupplierCodesWithExtraClient";

// Types and interfaces
import { SupplierCodesWithExtra } from "@/app/lib/types/data/supplierCodes";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";

interface Props {
  searchParams?: SearchParams["supplierCodes"];
  locale: Locale;
}

export default async function ListSupplierCodesWithExtra({
  searchParams,
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const supplierCodes = await retrieve({
    request: "SupplierCodes",
    paginationOff: "true",
  });

  const list = await retrieve({
    request: "SupplierCodesWithExtra",
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
          <ListSupplierCodesWithExtraClient
            filters={searchParams?.filters}
            pagination={searchParams?.pagination}
            supplierCodesWithExtra={list.data as SupplierCodesWithExtra}
            dictDialogReplace={dict.supplierCode.dialogs.replace}
            dictDialogEdit={dict.supplierCode.dialogs.edit}
            dictCard={dict.supplierCode.card}
            dictNotFound={dict.misc.notFound}
            fields={{
              name: { dict: dict.form.fields.name },
              description: { dict: dict.form.fields.description },
              button: dict.form.buttons.submit,
              supplierCode: {
                list: supplierCodes.data ? supplierCodes.data : [],
                name: "SupplierCode",
                dict: dict.form.fields.supplierCodes,
              },
            }}
          />
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterSupplierCodes
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
          type="supplierCodes"
        />
      </div>
    </>
  );
}
