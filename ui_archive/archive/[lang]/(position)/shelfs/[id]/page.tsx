import { getZones, getZoneByShelf  } from "@/app/lib/requests/zones/get";
import { getAisles, getAisleByShelf } from "@/app/lib/requests/aisles/get";
import { getRacks, getRackByShelf } from "@/app/lib/requests/racks/get"
import { getShelfs, getShelfById } from "@/app/lib/requests/shelfs/get"
import { getDictionary, Locale } from "@/lib/dictionaries";

import { ScrollArea } from "@/components/scroll-area";

import SingleShelfHeader from "@/app/ui/shelfs/single_header";
import SingleShelfCard from "@/app/ui/shelfs/single_card";

interface ShelfIdPageProps {
  params: {
    id: string;
    lang: string;
  };
}

export default async function ShelfIdPage({ params }: ShelfIdPageProps) {
  const dict = await getDictionary(params.lang as Locale)

  const pItem = getShelfById(params.id);
  const pItemZone = getZoneByShelf(params.id);
  const pItemAisle = getAisleByShelf(params.id);
  const pItemRack = getRackByShelf(params.id);

  const pAisles = getAisles();
  const pZones = getZones();
  const pRacks = getRacks();
  const pShelfs = getShelfs();
  
  const [item, itemZone, itemAisle, itemRack, aisles, zones, racks, shelfs] = await Promise.all(
    [pItem, pItemZone, pItemAisle, pItemRack, pAisles, pZones, pRacks, pShelfs]);
  
  return (
    <>
      <div className="grid xl:grid-cols-2">
        <div className="xl:border-r">
          <SingleShelfHeader 
            zone={itemZone}
            aisle={itemAisle}
            rack={itemRack}
            shelf={item}
            dict_header={dict.shelfs.header_single} />
          <ScrollArea className="h-[calc(100vh_-_57px)]" type="always">
            <div className="p-4">
              <SingleShelfCard 
                shelf={item}
                shelfs={shelfs}
                shelfZone={itemZone}
                shelfAisle={itemAisle}
                shelfRack={itemRack}
                zones={zones}
                aisles={aisles}
                racks={racks}
                items_count={2}
                locale={params.lang}
                dict_card={dict.shelfs.card}
                dict_edit={dict.shelfs.edit_form}
                dict_delete={dict.shelfs.delete_form}
                dict_zone_select={dict.zones.select_field}
                dict_aisle_select={dict.aisles.select_field}
                dict_rack_select={dict.racks.select_field} 
                dict_shelf_select={dict.shelfs.select_field} />
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
