import { getDictionary, Locale } from "@/lib/dictionaries";
import { getAislesByZoneId } from "@/app/lib/requests/aisles/get";
import { getZoneById } from "@/app/lib/requests/zones/get";
import ZoneHeader from "@/app/ui/zones/header";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AddBulkAisles } from "@/app/ui/aisles/bulk_add/dialog";

interface ZoneIdPageProps {
  params: {
    id: string;
    lang: string;
  }
}

export default async function ZoneIdPage({ params }: ZoneIdPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  const promiseZoneData = getZoneById(params.id);
  const promiseAislesOfZone = getAislesByZoneId(params.id);

  const [zoneData, aislesOfZone] = await Promise.all([promiseZoneData, promiseAislesOfZone]);
  
  return (
    <>
      <main className="grid xl:grid-cols-2">
        <div className="xl:border-r">
          <ZoneHeader dict={dict.zones} lang={params.lang} />
          <ScrollArea className="xl:h-[calc(100vh_-_57px)] h-[calc(100vh_-_57px)] p-4" type="always">
            <AddBulkAisles dict={dict.aisles.bulk_form} locale={params.lang} zone_id={params.id} />
            <div className="w-full">{zoneData.name}</div>
            <div>{aislesOfZone.map((item: any) => (
              <div>{item.id}</div>
            ))}</div>
          </ScrollArea>
        </div>
        <div>
          <ZoneHeader dict={dict.zones} lang={params.lang} />
          <ScrollArea className="xl:h-[calc(100vh_-_57px)] h-[calc(100vh_-_114px)] p-4" type="always">
          </ScrollArea>
        </div>
      </main>
    </>
  )
}


