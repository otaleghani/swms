import { getZones, getZoneByRack  } from "@/app/lib/requests/zones/get";
import { getAisles, getAisleByRack } from "@/app/lib/requests/aisles/get";
import { getRacks, getRackById } from "@/app/lib/requests/racks/get"
import { getShelfsByRackWithExtra } from "@/app/lib/requests/shelfs/get"
import { getDictionary, Locale } from "@/lib/dictionaries";

import { ScrollArea } from "@/components/scroll-area";
import SingleRackHeader from "@/app/ui/racks/single_header";
import SingleRackCard from "@/app/ui/racks/single_card";
import CollectionShelfsCards from "@/app/ui/shelfs/collection_cards";

interface RacksIdPageProps {
  params: {
    id: string;
    lang: string;
  };
}

export default async function RackIdPage({ params }: RacksIdPageProps) {
  const dict = await getDictionary(params.lang as Locale)

  const pItem = getRackById(params.id);
  const pItemZone = getZoneByRack(params.id);
  const pItemAisle = getAisleByRack(params.id);
  const pItemShelfs = getShelfsByRackWithExtra(params.id);

  const pAisles = getAisles();
  const pZones = getZones();
  const pRacks = getRacks();
  const pShelfs = getShelfsByRackWithExtra(params.id);
  
  const [item, itemZone, itemAisle, itemShelfs, aisles, zones, racks, shelfs] = await Promise.all(
    [pItem, pItemZone, pItemAisle, pItemShelfs, pAisles, pZones, pRacks, pShelfs]);

  return (
    <>
      <div className="grid xl:grid-cols-2">
        <div className="xl:border-r">
          <SingleRackHeader 
            zone={itemZone}
            aisle={itemAisle}
            rack={item}
            lang={params.lang} 
            dict_header={dict.racks.header_single} 
            dict_shelfs_bulk_form={dict.racks.bulk_form} />
          <ScrollArea className="h-[calc(100vh_-_57px)]" type="always">
            <div className="p-4">
              <SingleRackCard 
                rack={item}
                rackZone={itemZone}
                rackAisle={itemAisle}
                zones={zones}
                aisles={aisles}
                shelfs_count={itemShelfs.length}
                items_count={2}
                locale={params.lang}
                dict_card={dict.racks.card}
                dict_edit={dict.racks.edit_form}
                dict_delete={dict.racks.delete_form}
                dict_zone_select={dict.zones.select_field}
                dict_aisle_select={dict.aisles.select_field} />
              <CollectionShelfsCards
                shelfs={shelfs}
                racks={racks} 
                aisles={aisles}
                zones={zones}
                dict_card={dict.racks.card} 
                dict_edit={dict.racks.edit_form}
                dict_delete={dict.racks.delete_form}
                dict_zone_select={dict.zones.select_field}
                dict_aisle_select={dict.aisles.select_field}
                dict_rack_select={dict.racks.select_field}
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
