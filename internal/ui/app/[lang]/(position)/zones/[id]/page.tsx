import { getDictionary, Locale } from "@/lib/dictionaries";
import { getAislesByZoneId } from "@/app/lib/requests/aisles/get";
import { getZoneById } from "@/app/lib/requests/zones/get";
import { ScrollArea } from "@/components/scroll-area";
import AislesCards from "@/app/ui/aisles/cards";
import SingleZoneHeader from "@/app/ui/zones/single_header";
import SingleZoneCard from "@/app/ui/zones/single_card";

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
      <div className="grid xl:grid-cols-2">
        <div className="xl:border-r">
          <SingleZoneHeader 
            dict_header={dict.zones.header_single} 
            dict_aisles_bulk_form={dict.aisles.bulk_form} 
            lang={params.lang} 
            zone={zoneData} />
          <ScrollArea className="h-[calc(100vh_-_57px)]" type="always">
            <div className="p-4">
              <SingleZoneCard 
                locale={params.lang}
                zone={zoneData} 
                dict_card={dict.zones.card}
                dict_edit={dict.zones.edit_form}
                dict_delete={dict.zones.delete_form}
                aisles_count={aislesOfZone.length}
                items_count={2}/>
              <AislesCards 
                aisle_data={aislesOfZone} 
                dict_card={dict.aisles.card} 
                dict_edit={dict.zones.edit_form}
                locale={params.lang} />
            </div>
          </ScrollArea>
        </div>
        <div>
          <ScrollArea className="h-[calc(100vh_-_57px)]" type="always">
            Sandro
          </ScrollArea>
        </div>
      </div>
    </>
  )
}


