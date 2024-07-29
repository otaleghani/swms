import { getZones } from "@/app/lib/requests/zones/get";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { ScrollArea } from "@/components/scroll-area";
import SingleAisleCard from "@/app/ui/aisles/single_card";
import { getAisleById, getAisles } from "@/app/lib/requests/aisles/get";
import { getRacksByAisleIdWithExtra } from "@/app/lib/requests/racks/get";
import { getZoneByAisle } from "@/app/lib/requests/zones/get";

import { Zone, Aisle } from "@/app/lib/types";

import SingleAisleHeader from "@/app/ui/aisles/s_header";

interface AisleIdPageProps {
  params: {
    id: string;
    lang: string;
  };
}

export default async function AisleIdPage({ params }: AisleIdPageProps) {
  const dict = await getDictionary(params.lang as Locale)

  // you need both for the select
  const promiseAisles = getAisles();
  const promiseSingleAisle = getAisleById(params.id);
  const promiseSingleZone = getZoneByAisle(params.id);
  const promiseZones = getZones();
  const promiseRacksOfAisle = getRacksByAisleIdWithExtra(params.id);
  
  const [aisles, aisle, zones, racks, zone] = await Promise.all([promiseAisles, promiseSingleAisle, promiseZones, promiseRacksOfAisle, promiseSingleZone]);
  

  return (
    <>
      <div className="grid xl:grid-cols-2">
        <div className="xl:border-r">
          <SingleAisleHeader 
            dict_header={dict.aisles.header_single} 
            dict_racks_bulk_form={dict.racks.bulk_form} 
            lang={params.lang} 
            zone={zone as Zone}
            aisle={aisle as Aisle} />
          <ScrollArea className="h-[calc(100vh_-_57px)]" type="always">
            <div className="p-4">
              <SingleAisleCard 
                locale={params.lang}
                zone={zone} 
                dict_card={dict.zones.card}
                dict_edit={dict.zones.edit_form}
                dict_delete={dict.zones.delete_form}
                aisles_count={aislesOfZone.length}
                items_count={2}/>
              <CollectionRacksCards 
                aisle_data={aislesOfZone} 
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
