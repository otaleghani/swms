import { AisleSearchParams } from "@/app/lib/types/pageParams";
import { Locale, getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { ScrollArea } from "@/app/ui/components/scroll-area";
import { gridCols } from "@/app/lib/searchParams";
import ForeignKeyFilter from "@/app/ui/patterns/filter/ForeignKeyFilter";
import { Zones } from "@/app/lib/types/data/zones";
import FilterZones from "@/app/ui/patterns/filter/FilterZones";

interface Props {
  searchParams?: AisleSearchParams;
  locale: Locale;
}

export default async function ListAislesWithExtra({
  searchParams,
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const zones = await retrieve("Zones")
  const aislesWithExtra = await retrieve("AislesWithExtra",
    searchParams?.pagination?.page,
    searchParams?.pagination?.perPage,
  );

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_121px)]">
        <div className={`grid gap-2 p-4 ${
          searchParams?.pagination?.layout 
            ? `${gridCols[searchParams.pagination.layout]}`
            : "grid-cols-3"
        }`}>
          {aislesWithExtra.data?.map((item) => (
            <>
              {item.aisle.id}
            </>
          ))}
        </div>
      </ScrollArea>
      {
      //<ForeignKeyFilter<"Zone">
      //  name="Zone"
      //  list={zones.data as Zones}
      //  type={"aisles"}
      //  dict={dict.form.fields.zones}
      //  key="zone"
      ///>
      }
      <FilterZones 
        list={zones.data as Zones}
        filterParam="aisles"
        dict={dict.form.fields.zones}
      />
      {
        // Filter component... Sheet that holds all of the filters 
      }
    </>
  )
}
