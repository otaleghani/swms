// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import FilterAisles from "@/app/ui/patterns/filter/data/FilterAisles";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import ListAislesWithExtraClient from "./ListAislesWithExtraClient";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import { Aisles, AislesWithExtra } from "@/app/lib/types/data/aisles";
import { SearchParams } from "@/app/lib/types/pageParams";

type Props =
  | {
      hideFilters: {
        zones?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["aisles"];
      locale: Locale;
      type: "complete";
      forceLayout: "list" | "dynamic";
    }
  | {
      hideFilters: {
        zones?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["aisles"];
      locale: Locale;
      type: "zone";
      zone: Zone;
      forceLayout: "list" | "dynamic";
  };

export default async function ListAislesWithExtra(props: Props) {
  const { searchParams, locale, type, hideFilters, forceLayout } = props;
  let currentZone;

  // Here decides if what data we need to handle
  let pList;
  if (type === "zone") {
    const { zone } = props;
    currentZone = zone;

    pList = retrieveByForeignId({
      request: "AislesWithExtra",
      foreign: "Zone",
      id: zone.id as string,
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  } else {
    pList = retrieve({
      request: "AislesWithExtra",
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  }
  const pDict = getDictionary(locale);
  const pZones = retrieve({ request: "Zones", paginationOff: "true" });
  const pAisles = retrieve({ request: "Aisles", paginationOff: "true" });

  const [list, dict, zones, aisles] = await Promise.all([pList, pDict, pZones, pAisles])

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
            <ListAislesWithExtraClient 
              type={type}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              aislesWithExtra={list.data as AislesWithExtra}
              dictDialogEdit={dict.aisle.dialogs.edit}
              dictDialogReplace={dict.aisle.dialogs.replace}
              dictCard={dict.aisle.card}
              dictNotFound={dict.misc.notFound}
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
          )}
          {type === "zone" && (
            <ListAislesWithExtraClient 
              type={type}
              zone={currentZone as Zone}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              aislesWithExtra={list.data as AislesWithExtra}
              dictDialogEdit={dict.aisle.dialogs.edit}
              dictDialogReplace={dict.aisle.dialogs.replace}
              dictCard={dict.aisle.card}
              dictNotFound={dict.misc.notFound}
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
          )}
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
          hide={hideFilters}
        />
        <PaginationPattern 
          forceLayout={forceLayout}
          totalPages={list.totalPages as number} 
          type="aisles"
        />
      </div>
    </>
  )
}
