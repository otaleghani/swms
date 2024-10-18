import { Suspense } from "react";

import { Zones } from "@/app/lib/types/data/zones";
import { Response } from "@/app/lib/types/misc";
import PaginationPattern from "../../patterns/pagination/PaginationPattern";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "../../components/scroll-area";

interface props {
  page?: number,
  perPage?: number,
}

export default async function TestListZones({
  page, perPage
}: props) {
  
  const zones = await retrieve(
    "Zones",
    page,
    perPage,
  );

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_121px)]">
      {zones.data?.map((item) => (
          <div>
            {item.id}
          </div>
        ))}
      </ScrollArea>
      <PaginationPattern 
        totalPages={zones.totalPages as number} 
        type="zones"
      />
    </>
  )
}
