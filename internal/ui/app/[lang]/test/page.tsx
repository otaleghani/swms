import { getAisles } from "@/app/lib/requests/aisles/get";
import { getRacks } from "@/app/lib/requests/racks/get";
import { getShelfs } from "@/app/lib/requests/shelfs/get";
import { getZones } from "@/app/lib/requests/zones/get";
import SelectPosition from "@/app/ui/general/form/select/position/field";
import ZoneSelectField from "@/app/ui/modules/zones/misc/ZoneSelectField";
//import { AddVariantDialogForm, AddVariantOfItemFormDialogTrigger, TestDialog, TestFormWrapper } from "@/app/ui/test_variant/TestPassComponents";
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import ComponentTesting from "./Component";
import ZoneAddFormDialog from "@/app/ui/modules/zones/add/ZoneAddFormDialog"
import getListByForeignKey from "@/app/lib/requests/generics/getListByForeignKey";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  //const pZones = getZones();
  //const pAisles = getAisles();
  //const pRacks = getRacks();
  //const pShelfs = getShelfs();

  const pZoneByAisles = getListByForeignKey("Zone", "Aisle", "99207782-3e36-4fe6-9be8-1a659094bded");

  //const [zones, aisles, racks, shelfs, theZone] = await Promise.all([pZones, pAisles, pRacks, pShelfs, pZoneByAisles]);
  const [theZone] = await Promise.all([pZoneByAisles]);
  console.log(theZone.data)


  return (
    <main>
      {
      // <ComponentTesting 
      //   list={zones}
      //   dict={dict.zones.select_field}
      // />
      // <ZoneAddFormDialog 
      //   dict={dict.forms}
      //   locale={params.lang}
      // />
      }
    </main>
  )
}
