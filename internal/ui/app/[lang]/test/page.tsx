import { getAisles } from "@/app/lib/requests/aisles/get";
import { getRacks } from "@/app/lib/requests/racks/get";
import { getShelfs } from "@/app/lib/requests/shelfs/get";
import { getZones } from "@/app/lib/requests/zones/get";
import SelectPosition from "@/app/ui/general/form/select/position/field";
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  const pZones = getZones();
  const pAisles = getAisles();
  const pRacks = getRacks();
  const pShelfs = getShelfs();

  const [zones, aisles, racks, shelfs] = await Promise.all([pZones, pAisles, pRacks, pShelfs]);

  return (
    <main>
      <SelectPosition
        locale={params.lang}
        zones={zones}
        aisles={aisles}
        racks={racks}
        shelfs={shelfs}

        dict_zone_select={dict.zones.select_field}
        dict_aisle_select={dict.aisles.select_field}
        dict_rack_select={dict.racks.select_field}
        dict_shelf_select={dict.shelfs.select_field}

        dict_zone_add_dialog={dict.zones.add_dialog}
        dict_aisle_add_dialog={dict.aisles.add_dialog}
        dict_rack_add_dialog={dict.racks.add_dialog}
      />
    </main>
  )
}
