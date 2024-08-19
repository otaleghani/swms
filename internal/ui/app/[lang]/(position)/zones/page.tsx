import { getDictionary, Locale } from "@/lib/dictionaries";
import { getZonesWithData, getZones } from "@/app/lib/requests/zones/get";
import ZoneHeader from "@/app/ui/zones/collection_header";
import CollectionZonesCards from "@/app/ui/zones/collection_cards";

interface ZonesPageProps {
  params: {
    lang: string;
  }
}

export default async function ZonesPage({ params }: ZonesPageProps ) {
  const dict = await getDictionary(params.lang as Locale);

  const pZonesWithData = getZonesWithData();
  const pZones = getZones();
  const [zonesWithData, zones] = await Promise.all([pZonesWithData, pZones])

  return (
    <div>
      <ZoneHeader dict={dict.zones} lang={params.lang} />
      <main className="p-4 grid xl:grid-cols-5 gap-2">
        <CollectionZonesCards 
          zones={zonesWithData} 
          zones_collection={zones}
          locale={params.lang}
          dict_card={dict.zones.card}
          dict_delete={dict.zones.delete_form}
          dict_edit={dict.zones.edit_form}
          dict_zone_select={dict.zones.select_field} />
      </main>
    </div>
  )
}
