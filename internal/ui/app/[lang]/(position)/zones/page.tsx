import { getDictionary, Locale } from "@/lib/dictionaries";
import { getZonesWithData} from "@/app/lib/requests/zones/get";
import ZoneCard from "@/app/ui/zones/collection_card";
import { ZoneInfo } from "@/app/lib/types";
import ZoneHeader from "@/app/ui/zones/collection_header";
import { Breadcrumbs } from "@/app/ui/general/breadcrumbs";

interface ZonesPageProps {
  params: {
    lang: string;
  }
}

export default async function ZonePage({ params }: ZonesPageProps ) {
  const dict = await getDictionary(params.lang as Locale);
  const promiseData = getZonesWithData()
  const [data] = await Promise.all([promiseData])

  return (
    <div>
      <ZoneHeader dict={dict.zones} lang={params.lang} />
      <main className="p-4 grid xl:grid-cols-5 gap-2">
        {data.map((item: ZoneInfo) => (
          <ZoneCard 
            zone={item} 
            locale={params.lang}
            dict_card={dict.zones.card}
            dict_delete={dict.zones.delete_form}
            dict_edit={dict.zones.edit_form} />
        ))}
      </main>
    </div>
  )
}
