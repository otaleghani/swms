import { AisleSearchParams } from "@/app/lib/types/pageParams";
import { Locale, getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { ScrollArea } from "@/app/ui/components/scroll-area";
import { gridCols } from "@/app/lib/searchParams";
import FilterAislesSheet from "@/app/ui/patterns/filter/data/FilterAislesSheet";
import { Zones } from "@/app/lib/types/data/zones";

interface Props {
  searchParams?: AisleSearchParams;
  locale: Locale;
}

export default async function ListAislesWithExtra({
  searchParams,
  locale,
}: Props) {

  const dict = await getDictionary(locale);
  const zones = await retrieve({
    request: "Zones", 
    paginationOff: "true"
  });

  const aislesWithExtra = await retrieve({
    request: "AislesWithExtra",
    page: searchParams?.pagination?.page,
    perPage: searchParams?.pagination?.perPage,
    filters: JSON.stringify(searchParams?.filters),
  })

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_121px)]">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "grid-cols-3"
        }`}>
          {aislesWithExtra.data?.map((item) => (
            <div key={item.aisle.id}>
              {item.aisle.id}
            </div>
          ))}
        </div>
      </ScrollArea>
      <FilterAislesSheet 
        zones={{
          list: zones.data as Zones,
          dict: dict.form.fields.zones
        }}
      />
      {
        // Filter component... Sheet that holds all of the filters 
      }
    </>
  )
}
