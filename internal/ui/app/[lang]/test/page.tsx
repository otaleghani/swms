import { getAisles } from "@/app/lib/requests/aisles/get";
import { getRacks } from "@/app/lib/requests/racks/get";
import { getShelfs } from "@/app/lib/requests/shelfs/get";
import { getZones } from "@/app/lib/requests/zones/get";
import SelectPosition from "@/app/ui/general/form/select/position/field";
//import { AddVariantDialogForm, AddVariantOfItemFormDialogTrigger, TestDialog, TestFormWrapper } from "@/app/ui/test_variant/TestPassComponents";
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
    </main>
  )
}
