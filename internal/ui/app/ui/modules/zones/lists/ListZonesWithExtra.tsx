// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FilterZones from "@/app/ui/patterns/filter/data/FilterZones";
import ListZonesWithExtraClient from "./ListZonesWithExtraClient";

// Types and interfaces
import { ZonesWithExtra } from "@/app/lib/types/data/zones";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";
import { Response } from "@/app/lib/types/misc";

interface Props {
  searchParams?: SearchParams["zones"];
  locale: Locale;
  list: Response<ZonesWithExtra>;
}

export default async function ListZonesWithExtra({
  searchParams,
  locale,
  list,
}: Props) {
  const dict = await getDictionary(locale);
  const zones = await retrieve({
    request: "Zones",
    paginationOff: "true",
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
          <ListZonesWithExtraClient
            filters={searchParams?.filters}
            pagination={searchParams?.pagination}
            zonesWithExtra={list.data as ZonesWithExtra}
            dictDialogReplace={dict.zone.dialogs.replace}
            dictDialogEdit={dict.zone.dialogs.edit}
            dictCard={dict.zone.card}
            dictNotFound={dict.misc.notFound}
            fields={{
              name: { dict: dict.form.fields.name },
              button: dict.form.buttons.submit,
              zone: {
                list: zones.data ? zones.data : [],
                name: "Zone",
                dict: dict.form.fields.zones,
              },
            }}
          />
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterZones
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
          type="zones"
        />
      </div>
    </>
  );
}
