import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale, getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { ScrollArea } from "@/app/ui/components/scroll-area";
import { gridCols } from "@/app/lib/searchParams";
import { Zones } from "@/app/lib/types/data/zones";
import FilterAisles from "@/app/ui/patterns/filter/data/FilterAisles";
import { AisleWithExtra } from "@/app/lib/types/data/aisles";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FetchToastPattern from "@/app/ui/patterns/FetchToast";

interface Props {
  searchParams?: SearchParams["aisles"];
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

  console.log(aislesWithExtra)
  return (
    <>
    {
    //className="xl:h-[calc(100vh_-_121px)]">
    }
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_57px)]">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "grid-cols-3"
        }`}>
          {aislesWithExtra.data?.map((item: AisleWithExtra) => (
            <div key={item.aisle.id}>
              {item.aisle.id}
            </div>
          ))} 
          {aislesWithExtra.data === null && <>{dict.misc.notFound}</>}
        </div>
      </ScrollArea>

      <div className="flex items-center justify-end bg-gray-50 border-t xl:h-[57px]">
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
          totalPages={aislesWithExtra.totalPages as number} 
          type="aisles"
        />
        <FetchToastPattern
          type={[ "Aisle", "Aisles" ]}
          dict={dict.toasts.fetching}
        />
      </div>
    </>
  )
}
