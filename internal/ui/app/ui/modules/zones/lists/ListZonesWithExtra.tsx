import { SearchParams } from "@/app/lib/types/pageParams";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { gridCols } from "@/app/lib/searchParams";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FetchToastPattern from "@/app/ui/patterns/FetchToast";
import ZoneWithExtraCard from "../cards/ZoneWithExtraCard";
import FilterZones from "@/app/ui/patterns/filter/data/FilterZones";

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
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_114px)] ">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "xl:grid-cols-3"
        }`}>
          {zonesWithExtra.data?.map((item) => (
            <ZoneWithExtraCard 
              key={item.zone.id}
              item={item}
              dictDialogEdit={dict.zone.dialogs.edit}
              dictDialogReplace={dict.zone.dialogs.replace}
              dictCard={dict.zone.card}
              dictFields={{
                name: dict.form.fields.name,
                button: dict.form.buttons.submit,
              }}
              dictButton={dict.form.buttons.submit}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
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
      </div>
      <FetchToastPattern
        type={[ "Zones", "Zone" ]}
        dict={dict.toasts.fetching}
      />
    </>
  )
}
