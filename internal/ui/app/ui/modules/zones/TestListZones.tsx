import { Suspense } from "react";

import { Zones } from "@/app/lib/types/data/zones";
import { Response } from "@/app/lib/types/misc";
import PaginationPattern from "../../patterns/PaginationPattern";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { useSearchParams } from "next/navigation";

interface props {
  page: number,
  perPage: number,
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
      {zones.data?.map((item) => (
          <div>
            {item.id}
          </div>
        ))}
      <PaginationPattern totalPages={zones.totalPages as number} />
    </>
  )
}
