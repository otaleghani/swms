import { ZoneSearchParams } from "@/app/lib/types/pageParams";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { gridCols } from "@/app/lib/searchParams";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FetchToastPattern from "@/app/ui/patterns/FetchToast";
import ZoneWithExtraCard from "../list/ZoneWithExtraCard";
import ForeignKeyFilter from "@/app/ui/patterns/filter/ForeignKeyFilter";

interface Props {
  searchParams?: ZoneSearchParams;
  locale: Locale
}

export default async function ListZonesWithExtra({
  searchParams,
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const zonesWithExtra = await retrieve("ZonesWithExtra",
    searchParams?.pagination?.page,
    searchParams?.pagination?.perPage,
  );
  // Here you should filter out the things that are not available in 
  // filters... Why should you have something that it's unavailable?

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_121px)]">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "grid-cols-3"
        }`}>
          {zonesWithExtra.data?.map((item) => (
            <ZoneWithExtraCard 
              key={item.zone.id}
              item={item}
            />
          ))}
        </div>
      </ScrollArea>
      <PaginationPattern 
        totalPages={zonesWithExtra.totalPages as number} 
        type="zones"
      />
      <FetchToastPattern
        type={[ "Zones", "Zone" ]}
        dict={dict.toasts.fetching}
      />
      {
        // Filter component... Sheet that holds all of the filters 
      }
    </>
  )
}
