import { getZones } from "@/app/lib/requests/zones/get";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { ScrollArea } from "@/components/scroll-area";
import SingleAisleCard from "@/app/ui/aisles/single_card";
import { getAisleById, getAisles } from "@/app/lib/requests/aisles/get";
import { getRacksByAisleIdWithExtra } from "@/app/lib/requests/racks/get";
import { getZoneByAisle } from "@/app/lib/requests/zones/get";
import CollectionRacksCards from "@/app/ui/racks/collection_cards";

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

  const pItem = getAisleById(params.id);
  const pItemZone = getZoneByAisle(params.id);
  const pItemRacks = getRacksByAisleIdWithExtra(params.id);
  const pAisles = getAisles();
  const pZones = getZones();
  
  const [item, itemZone, itemRacks, aisles, zones] = await Promise.all([pItem, pItemZone, pItemRacks, pAisles, pZones]);

  return (
    <>
      <div className="grid xl:grid-cols-2">
        <div className="xl:border-r">
          <SingleAisleHeader 
            aisle={item}
            zone={itemZone}
            lang={params.lang} 
            dict_header={dict.aisles.header_single} 
            dict_racks_bulk_form={dict.racks.bulk_form} />
          <ScrollArea className="h-[calc(100vh_-_57px)]" type="always">
            <div className="p-4">
              <SingleAisleCard 
                aisle={item} 
                aisleZone={itemZone}
                zones={zones}
                racks_count={itemRacks.length}
                items_count={2}
                locale={params.lang}
                dict_card={dict.aisles.card}
                dict_edit={dict.aisles.edit_form}
                dict_delete={dict.aisles.delete_form}
                dict_zone_select={dict.zones.select_field} />
            </div>
            <CollectionRacksCards 
              racks={itemRacks} 
              aisles={aisles}
              zones={zones}
              dict_card={dict.aisles.card} 
              dict_edit={dict.zones.edit_form}
              dict_delete={dict.aisles.delete_form}
              dict_zone_select={dict.zones.select_field}
              dict_aisle_select={dict.zones.select_field}
              locale={params.lang} />
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
