import { SearchParams } from "@/app/lib/types/pageParams";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { gridCols } from "@/app/lib/searchParams";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FetchToastPattern from "@/app/ui/patterns/FetchToast";
import ZoneWithExtraCard from "../cards/ZoneWithExtraCard";
import ForeignKeyFilter from "@/app/ui/patterns/filter/ForeignKeyFilter";
import FilterZones from "@/app/ui/patterns/filter/data/FilterZones";
import FilterClients from "@/app/ui/patterns/filter/data/FilterClients";
import FilterTickets from "@/app/ui/patterns/filter/data/FilterTickets";

interface Props {
  searchParams?: SearchParams["zones"];
  locale: Locale
}

export default async function ListZonesWithExtra({
  searchParams,
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const zonesWithExtra = await retrieve({
    request: "ZonesWithExtra",
    page: searchParams?.pagination?.page,
    perPage: searchParams?.pagination?.perPage,
    filters: JSON.stringify(searchParams?.filters),
  });

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_114px)] bg-gray-50">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "xl:grid-cols-3"
        }`}>
          {zonesWithExtra.data?.map((item) => (
            <ZoneWithExtraCard 
              key={item.zone.id}
              item={item}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end bg-gray-50 border-t xl:h-[57px]">
        <FilterZones 
          dict={dict.filters}
          fields={{
            search: {
              dict: dict.form.fields.search
            }
          }}
        />
        <PaginationPattern 
          totalPages={zonesWithExtra.totalPages as number} 
          type="zones"
        />
        <FilterTickets 
          dict={dict.filters}
          fields={{
            open: {dict: dict.form.fields.openDate},
            close: {dict: dict.form.fields.closeDate},
            clients: {list: [], dict: dict.form.fields.clients},
            products: {list: [], dict: dict.form.fields.products},
            ticketTypes: {list: [], dict: dict.form.fields.ticketTypes},
            ticketStates: {list: [], dict: dict.form.fields.ticketStates},
            search: {dict: dict.form.fields.search}
          }}
        />
      </div>
      <FetchToastPattern
        type={[ "Zones", "Zone" ]}
        dict={dict.toasts.fetching}
      />
    </>
  )
}
