import { getDictionary, Locale } from "@/lib/dictionaries";
import { getAislesByZoneIdWithExtra } from "@/app/lib/requests/aisles/get";
import { getZoneById, getZones } from "@/app/lib/requests/zones/get";
import { ScrollArea } from "@/components/scroll-area";
import CollectionAislesCards from "@/app/ui/aisles/collection_cards";
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

  const promiseZones = getZones();
  const promiseZoneData = getZoneById(params.id);
  const promiseAislesOfZone = getAislesByZoneIdWithExtra(params.id);

  const [zoneData, zones, aislesOfZone] = await Promise.all([promiseZoneData, promiseZones, promiseAislesOfZone]);
  
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
              <CollectionAislesCards 
                aisles={aislesOfZone} 
                dict_card={dict.aisles.card} 
                dict_edit={dict.zones.edit_form}
                dict_delete={dict.aisles.delete_form}
                dict_zone_select={dict.zones.select_field}
                locale={params.lang} 
                zones={zones} />
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


