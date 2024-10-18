import PaginationPattern from "../../patterns/pagination/PaginationPattern";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { ScrollArea } from "../../components/scroll-area";
import { ZoneSearchParams } from "@/app/lib/types/pageParams";
import { gridCols } from "@/app/lib/searchParams";
import FetchToastPattern from "../../patterns/FetchToast";

interface props {
  params?: ZoneSearchParams;
  page?: number;
  perPage?: number;
}

export default async function TestListZones({
  params,
}: props) {
  
  const zones = await retrieve(
    "Zones",
    params?.pagination?.page,
    params?.pagination?.perPage
  );


  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_121px)]">
      <div className={`grid ${
        params?.pagination?.layout 
          ? `${gridCols[params.pagination.layout]}`
          : "grid-cols-3"
      }`}>
        {zones.data?.map((item) => (
            <div>
              {item.id}
            </div>
          ))}
      </div>
      </ScrollArea>
      <PaginationPattern 
        totalPages={zones.totalPages as number} 
        type="zones"
      />
      <FetchToastPattern
        type={["Zones","Zone"]}
        dict={{
          title: "sis",
          description: "sas",
          button: "sus"
        }}
      />
    </>
  )
}
