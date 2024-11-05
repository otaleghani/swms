// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import FilterAisles from "@/app/ui/patterns/filter/data/FilterAisles";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import ListAislesWithExtraClient from "./ListAislesWithExtraClient";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Zones } from "@/app/lib/types/data/zones";
import { Aisles, AislesWithExtra } from "@/app/lib/types/data/aisles";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Response } from "@/app/lib/types/misc";

interface Props {
  searchParams?: SearchParams["aisles"];
  locale: Locale;
  list: Response<AislesWithExtra>;
}

export default async function ListAislesWithExtra({
  searchParams,
  locale,
  list,
}: Props) {
  const dict = await getDictionary(locale);
  const zones = await retrieve({ request: "Zones", paginationOff: "true" });
  const aisles = await retrieve({ request: "Aisles", paginationOff: "true" });

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_114px)]">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "xl:grid-cols-3"
        }`}>
          <ListAislesWithExtraClient 
            pagination={searchParams?.pagination}
            filters={searchParams?.filters}
            aislesWithExtra={list.data as AislesWithExtra}
            dictDialogEdit={dict.aisle.dialogs.edit}
            dictDialogReplace={dict.aisle.dialogs.replace}
            dictCard={dict.aisle.card}
            fields={{
              name: { dict: dict.form.fields.name },
              button: dict.form.buttons.submit,
              zone: { 
                dict: dict.form.fields.zones,
                list: zones.data as Zones,
                name: "Zone",
              },
              aisle: { 
                dict: dict.form.fields.aisles,
                list: aisles.data as Aisles,
                name: "Aisle",
              },
            }}
          />
          {list.data === null && <>{dict.misc.notFound}</>}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterAisles
          dict={dict.filters}
          fields={{
            zones: {
              list: zones.data as Zones,
              dict: dict.form.fields.zones
            },
            search: {
              dict: dict.form.fields.search
            }
          }}
        />
        <PaginationPattern 
          totalPages={list.totalPages as number} 
          type="aisles"
        />
      </div>
    </>
  )
}
