import { SearchParams } from "@/app/lib/types/pageParams";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { gridCols } from "@/app/lib/searchParams";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FetchToastPattern from "@/app/ui/patterns/FetchToast";
import FilterZones from "@/app/ui/patterns/filter/data/FilterZones";
import CardZoneWithExtra from "../cards/CardZoneWithExtra";
import CardZone from "../cards/CardZone";

interface Props {
  searchParams?: SearchParams["zones"];
  locale: Locale
}

export default async function ListZones({
  searchParams,
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const zones = await retrieve({
    request: "Zones",
    page: searchParams?.pagination?.page,
    perPage: searchParams?.pagination?.perPage,
    filters: JSON.stringify(searchParams?.filters),
  });
  const zonesCompleteList = await retrieve({request: "Zones"});

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_114px)] ">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "xl:grid-cols-3"
        }`}>
          {zones.data?.map((item) => (
            <CardZone
              key={item.id}
              item={item}
              dictDialogEdit={dict.zone.dialogs.edit}
              dictDialogReplace={dict.zone.dialogs.replace}
              fields={{
                name: {dict: dict.form.fields.name},
                button: dict.form.buttons.submit,
                zone: {
                  list: zonesCompleteList.data ? zonesCompleteList.data : [], 
                  name: "Zone",
                  dict: dict.form.fields.zones,
                }
              }}
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
          forceLayout="list"
          totalPages={zones.totalPages as number} 
          type="zones"
        />
      </div>
    </>
  )
}
