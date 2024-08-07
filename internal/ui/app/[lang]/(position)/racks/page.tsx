import { getDictionary, Locale } from "@/lib/dictionaries";
import { getAisles } from "@/app/lib/requests/aisles/get";
import { getZones } from "@/app/lib/requests/zones/get";
import { getRacksWithData } from "@/app/lib/requests/racks/get";

import CollectionRacksCards from "@/app/ui/racks/collection_cards";
import CollectionRacksHeader from "@/app/ui/racks/collection_header";

interface AislePageProps {
  params: {
    lang: string;
  }
}

export default async function RacksPage({ params }: AislePageProps ) {
  const dict = await getDictionary(params.lang as Locale);
  const pZones = getZones();
  const pAisles = getAisles();
  const pRacks = getRacksWithData();
  const [aisles, zones, racks] = await Promise.all(
    [pAisles, pZones, pRacks]);

  return (
    <div>
      <CollectionRacksHeader 
        dict={dict.racks} />
      <main className="p-4">
        <CollectionRacksCards
          dict_card={dict.racks.card}
          zones={zones}
          aisles={aisles}
          racks={racks}
          locale={params.lang}
          dict_edit={dict.aisles.edit_form}
          dict_delete={dict.aisles.delete_form}
          dict_zone_select={dict.zones.select_field}
          dict_aisle_select={dict.aisles.select_field}
        />
      </main>
    </div>
  )
}
