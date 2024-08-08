import { getDictionary, Locale } from "@/lib/dictionaries";
import { getZones } from "@/app/lib/requests/zones/get";
import { getAisles } from "@/app/lib/requests/aisles/get";
import { getRacks } from "@/app/lib/requests/racks/get";
import { getShelfsWithData } from "@/app/lib/requests/shelfs/get";

import CollectionShelfsCards from "@/app/ui/shelfs/collection_cards";
import CollectionShelfsHeader from "@/app/ui/shelfs/collection_header";

interface ShelfsPageProps {
  params: {
    lang: string;
  }
}

export default async function ShelfsPage({ params }: ShelfsPageProps ) {
  const dict = await getDictionary(params.lang as Locale);
  const pZones = getZones();
  const pAisles = getAisles();
  const pRacks = getRacks();
  const pShelfs = getShelfsWithData();
  const [aisles, zones, racks, shelfs] = await Promise.all(
    [pAisles, pZones, pRacks, pShelfs]);

  return (
    <div>
      <CollectionShelfsHeader 
        dict={dict.racks} />
      <main className="p-4">
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
      </main>
    </div>
  )
}
