import { getZones, getZoneByRack  } from "@/app/lib/requests/zones/get";
import { getAisles, getAisleByRack } from "@/app/lib/requests/aisles/get";
import { getRacks, getRackById } from "@/app/lib/requests/racks/get"
import { getShelfsByRackWithExtra } from "@/app/lib/requests/shelfs/get"
import { getDictionary, Locale } from "@/lib/dictionaries";

import { ScrollArea } from "@/components/scroll-area";
import SingleAisleCard from "@/app/ui/aisles/single_card";
import CollectionRacksCards from "@/app/ui/racks/collection_cards";
import SingleAisleHeader from "@/app/ui/aisles/s_header";
import SingleRackHeader from "@/app/ui/racks/s_header";

interface AisleIdPageProps {
  params: {
    id: string;
    lang: string;
  };
}

export default async function AisleIdPage({ params }: AisleIdPageProps) {
  const dict = await getDictionary(params.lang as Locale)

  const pItem = getRackById(params.id);
  const pItemZone = getZoneByRack(params.id);
  const pItemAisle = getAisleByRack(params.id);
  const pItemShelfs = getShelfsByRackWithExtra(params.id);

  const pAisles = getAisles();
  const pZones = getZones();
  const pRacks = getRacks();
  
  const [item, itemZone, itemAisle, itemShelfs, aisles, zones, racks] = await Promise.all(
    [pItem, pItemZone, pItemAisle, pItemShelfs, pAisles, pZones, pRacks]);

  return (
    <>
      <div className="grid xl:grid-cols-2">
        <div className="xl:border-r">
          <SingleRackHeader 
            zone={itemZone}
            aisle={itemAisle}
            rack={item}
            lang={params.lang} 
            dict_header={dict.aisles.header_single} 
            dict_shelfs_bulk_form={dict.racks.bulk_form} />
          {
          //<ScrollArea className="h-[calc(100vh_-_57px)]" type="always">
          //  <div className="p-4">
          //    <SingleAisleCard 
          //      aisle={item} 
          //      aisleZone={itemZone}
          //      zones={zones}
          //      racks_count={itemRacks.length}
          //      items_count={2}
          //      locale={params.lang}
          //      dict_card={dict.aisles.card}
          //      dict_edit={dict.aisles.edit_form}
          //      dict_delete={dict.aisles.delete_form}
          //      dict_zone_select={dict.zones.select_field} />
          //  <CollectionRacksCards 
          //    racks={itemRacks} 
          //    aisles={aisles}
          //    zones={zones}
          //    dict_card={dict.racks.card} 
          //    dict_edit={dict.racks.edit_form}
          //    dict_delete={dict.racks.delete_form}
          //    dict_zone_select={dict.zones.select_field}
          //    dict_aisle_select={dict.aisles.select_field}
          //    locale={params.lang} />
          //  </div>
          //</ScrollArea>
          }
          
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
