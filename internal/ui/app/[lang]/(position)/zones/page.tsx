import { getDictionary, Locale } from "@/lib/dictionaries";
import { getZonesWithData} from "@/app/lib/requests/zones/get";
import ZoneCard from "@/app/ui/zones/collection_cards";
import { ZoneInfo } from "@/app/lib/types";
import ZoneHeader from "@/app/ui/zones/collection_header";

interface ZonesPageProps {
  params: {
    lang: string;
  }
}

export default async function ZonesPage({ params }: ZonesPageProps ) {
  const dict = await getDictionary(params.lang as Locale);
  const pZones = getZonesWithData()
  const [zones] = await Promise.all([pZones])

  return (
    <div>
      <ZoneHeader dict={dict.zones} lang={params.lang} />
      <main className="p-4 grid xl:grid-cols-5 gap-2">
        <ZoneCard 
          zones={zones} 
          locale={params.lang}
          dict_card={dict.zones.card}
          dict_delete={dict.zones.delete_form}
          dict_edit={dict.zones.edit_form} />
      </main>
    </div>
  )
}
