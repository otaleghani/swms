import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary, Locale } from "@/lib/dictionaries";
//import ....
//

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FilterItems from "@/app/ui/patterns/filter/data/FilterItems";

// Types and interfaces
import { SearchParams } from "@/app/lib/types/pageParams";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";
import ListItemsClient from "./ListItemsClient";

type Props = | {
  hideFilters: {
    zones?: boolean;
    aisles?: boolean;
    racks?: boolean;
    shelfs?: boolean;
    categories?: boolean;
    subcategories?: boolean;
    isArchived?: boolean;
    search?: boolean;
  }
  searchParams?: SearchParams["items"];
  locale: Locale;
  type: "Zone" | "Aisle" | "Rack" | "Shelf" | "Category" | "Subcategory";
  id: string;
} | {
  hideFilters: {
    zones?: boolean;
    aisles?: boolean;
    racks?: boolean;
    shelfs?: boolean;
    categories?: boolean;
    subcategories?: boolean;
    isArchived?: boolean;
    search?: boolean;
  }
  searchParams?: SearchParams["items"];
  locale: Locale;
  type: "complete";
}

export default async function ListItems(props: Props) {
  const {searchParams, locale, type, hideFilters} = props;
  let pList;
  let foreignId;

  if (type === "complete") {
    pList = retrieve({
      request: "Items",
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  } else {
    const {id} = props;
    foreignId = id;
    pList = retrieveByForeignId({
      request: "Items",
      foreign: type,
      id: id,
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  }

  const pDict = getDictionary(locale);
  const pZones = retrieve({ request: "Zones", paginationOff: "true", });
  const pAisles = retrieve({ request: "Aisles", paginationOff: "true", });
  const pRacks = retrieve({ request: "Racks", paginationOff: "true", });
  const pShelfs = retrieve({ request: "Shelfs", paginationOff: "true", });
  const pCategories = retrieve({ request: "Categories", paginationOff: "true", });
  const pSubcategories = retrieve({ request: "Subcategories", paginationOff: "true", });
  const pImages = retrieve({request: "ItemImages", paginationOff: "true"});

  const [list, dict, zones, aisles, racks, shelfs, categories, subcategories, images] = 
    await Promise.all([pList, pDict, pZones, pAisles, pRacks, pShelfs, pCategories, pSubcategories, pImages])

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="h-full">
        <div className="grid gap-2 xl:grid-cols-1">
          {type === "complete" ? (
            <>
              <ListItemsClient
                type={type}
                filters={searchParams?.filters}
                pagination={searchParams?.pagination}
                items={list.data ? list.data : []}
                dictNotFound={dict.misc.notFound}
                categoriesList={categories.data ? categories.data : []}
                zonesList={zones.data ? zones.data : []}
                imagesList={images.data ? images.data : []}
              />
            </>
          ) : (
            <>
              <ListItemsClient
                type={type}
                id={foreignId as string}
                filters={searchParams?.filters}
                pagination={searchParams?.pagination}
                items={list.data ? list.data : []}
                dictNotFound={dict.misc.notFound}
                categoriesList={categories.data ? categories.data : []}
                zonesList={zones.data ? zones.data : []}
                imagesList={images.data ? images.data : []}
              />
            </>
          )}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterItems
          dict={dict.filters}
          fields={{
            search: { dict: dict.form.fields.search },
            categories: {
              list: categories.data ? categories.data : [],
              dict: dict.form.fields.categories,
            },
            subcategories: {
              list: subcategories.data ? subcategories.data : [],
              dict: dict.form.fields.subcategories,
            },
            zones: {
              list: zones.data ? zones.data : [],
              dict: dict.form.fields.zones,
            },
            aisles: {
              list: aisles.data ? aisles.data : [],
              dict: dict.form.fields.aisles,
            },
            racks: {
              list: racks.data ? racks.data : [],
              dict: dict.form.fields.racks,
            },
            shelfs: {
              list: shelfs.data ? shelfs.data : [],
              dict: dict.form.fields.shelfs,
            },
            isArchived: { dict: dict.form.fields.isArchived }
          }}
          hide={hideFilters}
        />
        <PaginationPattern
          totalPages={list.totalPages as number}
          type="subcategories"

          hideLayoutSelector
          forceLayout="list"
        />
      </div>
    </>
  );
}
