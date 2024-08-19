import { getDictionary, Locale } from "@/lib/dictionaries";
import { getAislesWithData, getAisles } from "@/app/lib/requests/aisles/get";
import { getZones } from "@/app/lib/requests/zones/get";

import CollectionAislesCards from "@/app/ui/aisles/collection_cards";
import CollectionAislesHeader from "@/app/ui/aisles/collection_header";

interface AislePageProps {
  params: {
    lang: string;
  }
}

export default async function AislesPage({ params }: AislePageProps ) {
  const dict = await getDictionary(params.lang as Locale);

  const pAislesWithData = getAislesWithData()
  const pAisles = getAisles()
  const pZones = getZones()
  const [aisles, aislesWithData, zones] = await Promise.all([pAisles, pAislesWithData, pZones])

  return (
    <div>
      <CollectionAislesHeader 
        dict={dict.aisles}
        lang={params.lang} />
      <main className="p-4">
        <CollectionAislesCards
          aisles={aislesWithData}
          aisles_collection={aisles}
          zones={zones}
          locale={params.lang}
          dict_card={dict.aisles.card}
          dict_edit={dict.aisles.edit_form}
          dict_delete={dict.aisles.delete_form}
          dict_zone_select={dict.zones.select_field}
          dict_aisle_select={dict.aisles.select_field}
        />
      </main>
    </div>
  )
}
