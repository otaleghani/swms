// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import FilterShelfs from "@/app/ui/patterns/filter/data/FilterShelfs";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import ListShelfsWithExtraClient from "./ListShelfsWithExtraClient";


// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Zones } from "@/app/lib/types/data/zones";
import { Aisle, Aisles } from "@/app/lib/types/data/aisles";
import { Rack, Racks, RacksWithExtra } from "@/app/lib/types/data/racks";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Shelf, Shelfs, ShelfsWithExtra } from "@/app/lib/types/data/shelfs";

type Props =
  | {
      hideFilters: {
        racks?: boolean;
        aisles?: boolean;
        zones?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["shelfs"];
      locale: Locale;
      type: "complete";
      forceLayout: "list" | "dynamic";
    }
  | {
      hideFilters: {
        zones?: boolean;
        search?: boolean;
        aisles?: boolean;
        racks?: boolean;
      };
      searchParams?: SearchParams["shelfs"];
      locale: Locale;
      type: "rack";
      rack: Rack;
      forceLayout: "list" | "dynamic";
  };

export default async function ListShelfsWithExtra(props: Props) {
  const { searchParams, locale, type, hideFilters, forceLayout } = props;
  let currentRack;

  // Here decides if what data we need to handle
  let pList;
  if (type === "rack") {
    const { rack } = props;
    currentRack = rack;

    pList = retrieveByForeignId({
      request: "ShelfsWithExtra",
      foreign: "Rack",
      id: rack.id as string,
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  } else {
    pList = retrieve({
      request: "ShelfsWithExtra",
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  }
  const pDict = getDictionary(locale);
  const pZones = retrieve({ request: "Zones", paginationOff: "true" });
  const pAisles = retrieve({ request: "Aisles", paginationOff: "true" });
  const pRacks = retrieve({ request: "Racks", paginationOff: "true" });
  const pShelfs = retrieve({ request: "Shelfs", paginationOff: "true" });

  const [list, dict, zones, aisles, racks, shelfs] = 
    await Promise.all([pList, pDict, pZones, pAisles, pRacks, pShelfs])


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
            <ListShelfsWithExtraClient 
              type={type}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              shelfsWithExtra={list.data as ShelfsWithExtra}
              dictDialogEdit={dict.shelf.dialogs.edit}
              dictDialogReplace={dict.shelf.dialogs.replace}
              dictCard={dict.shelf.card}
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
                rack: { 
                  dict: dict.form.fields.racks,
                  list: racks.data as Racks,
                  name: "Rack",
                },
                shelf: { 
                  dict: dict.form.fields.shelfs,
                  list: shelfs.data as Shelfs,
                  name: "Shelf",
                },
              }}
            />
          )}
          {type === "rack" && (
            <ListShelfsWithExtraClient 
              type={type}
              rack={currentRack as Rack}
              pagination={searchParams?.pagination}
              filters={searchParams?.filters}
              shelfsWithExtra={list.data as ShelfsWithExtra}
              dictDialogEdit={dict.shelf.dialogs.edit}
              dictDialogReplace={dict.shelf.dialogs.replace}
              dictCard={dict.shelf.card}
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
                rack: { 
                  dict: dict.form.fields.racks,
                  list: racks.data as Racks,
                  name: "Rack",
                },
                shelf: { 
                  dict: dict.form.fields.shelfs,
                  list: shelfs.data as Shelfs,
                  name: "Shelf",
                },
              }}
            />
          )}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterShelfs
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
            racks: {
              list: racks.data as Racks,
              dict: dict.form.fields.racks
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
          type="racks"
        />
      </div>
    </>
  )
}
