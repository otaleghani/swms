import { getDictionary, Locale } from "@/lib/dictionaries";
import { getAislesWithData } from "@/app/lib/requests/aisles/get";
import { getZones } from "@/app/lib/requests/zones/get";

import { AisleInfo } from "@/app/lib/types";
import AislesCollectionHeader from "@/app/ui/aisles/c_header";
import CollectionAislesCards from "@/app/ui/aisles/c_cards";

interface AislePageProps {
  params: {
    lang: string;
  }
}

export default async function ZonePage({ params }: AislePageProps ) {
  const dict = await getDictionary(params.lang as Locale);
  const pAisles = getAislesWithData()
  const pZones = getZones()
  const [aisles, zones] = await Promise.all([pAisles, pZones])

  return (
    <div>
      <AislesCollectionHeader 
        dict={dict.zones} 
        lang={params.lang} />
      <main className="p-4 grid xl:grid-cols-5 gap-2">
        {aisles.map((item: AisleInfo) => (
          <CollectionAislesCards
            dict_card={dict.aisles.card}
            aisles={aisles}
            zones={zones}
            locale={params.lang}
            dict_edit={dict.aisles.edit_form}
            dict_delete={dict.aisles.delete_form}
            dict_zone_select={dict.zone.select_field}
          />
        ))}
      </main>
    </div>
  )
}
