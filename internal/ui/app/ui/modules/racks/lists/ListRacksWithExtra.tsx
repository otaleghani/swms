// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import FilterRacks from "@/app/ui/patterns/filter/data/FilterRacks";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import ListRacksWithExtraClient from "./ListRacksWithExtraClient";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Zones } from "@/app/lib/types/data/zones";
import { Aisle, Aisles, AislesWithExtra } from "@/app/lib/types/data/aisles";
import { Racks, RacksWithExtra } from "@/app/lib/types/data/racks";
import { SearchParams } from "@/app/lib/types/pageParams";

type Props =
  | {
      hideFilters: {
        aisles?: boolean;
        zones?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["racks"];
      locale: Locale;
      type: "complete";
      forceLayout: "list" | "dynamic";
    }
  | {
      hideFilters: {
        zones?: boolean;
        search?: boolean;
        aisles?: boolean;
      };
      searchParams?: SearchParams["racks"];
      locale: Locale;
      type: "aisle";
      aisle: Aisle;
      forceLayout: "list" | "dynamic";
  };

export default async function ListRacksWithExtra(props: Props) {
  const { searchParams, locale, type, hideFilters, forceLayout } = props;
  let currentAisle;

  // Here decides if what data we need to handle
  let pList;
  if (type === "aisle") {
    const { aisle } = props;
    currentAisle = aisle;

    pList = retrieveByForeignId({
      request: "RacksWithExtra",
      foreign: "Aisle",
      id: aisle.id as string,
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  } else {
    pList = retrieve({
      request: "RacksWithExtra",
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  }
  const pDict = getDictionary(locale);
  const pZones = retrieve({ request: "Zones", paginationOff: "true" });
  const pAisles = retrieve({ request: "Aisles", paginationOff: "true" });
  const pRacks = retrieve({ request: "Racks", paginationOff: "true" });

  const [list, dict, zones, aisles, racks] = await Promise.all([pList, pDict, pZones, pAisles, pRacks])

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
            <ListRacksWithExtraClient 
              type={type}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              racksWithExtra={list.data as RacksWithExtra}
              dictDialogEdit={dict.aisle.dialogs.edit}
              dictDialogReplace={dict.aisle.dialogs.replace}
              dictCard={dict.rack.card}
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
                rack: { 
                  dict: dict.form.fields.racks,
                  list: racks.data as Racks,
                  name: "Rack",
                },
              }}
            />
          )}
          {type === "aisle" && (
            <ListRacksWithExtraClient 
              type={type}
              aisle={currentAisle as Aisle}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              racksWithExtra={list.data as RacksWithExtra}
              dictDialogEdit={dict.rack.dialogs.edit}
              dictDialogReplace={dict.rack.dialogs.replace}
              dictCard={dict.rack.card}
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
                rack: { 
                  dict: dict.form.fields.aisles,
                  list: racks.data as Racks,
                  name: "Rack",
                },
              }}
            />
          )}
          {list.data === null && <>{dict.misc.notFound}</>}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterRacks
          dict={dict.filters}
          fields={{
            zones: {
              list: zones.data as Zones,
              dict: dict.form.fields.zones
            },
            aisles: {
              list: aisles.data as Aisles,
              dict: dict.form.fields.aisles
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
