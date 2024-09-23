import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import { dateToISOString, dateToLocaleDateString, dateToLocaleString, dateToLocaleTimeString } from "@/app/lib/validation/dates";
import SelectFieldPattern from "@/app/ui/patterns/form/select/SelectFieldPattern";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { defaultZoneFormState, Zones } from "@/app/lib/types/data/zones";
import { Zone } from "@/app/lib/types";
import ZoneSelectField from "@/app/ui/modules/zones/misc/ZoneSelectField";
import TestSelect from "@/app/ui/modules/zones/test/SelectTest";
import ZoneForm from "@/app/ui/modules/zones/misc/form/ZoneForm";
import zoneAddFormAction from "@/app/ui/modules/zones/create/single/actionCreate";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  const pZones = retrieve("Zones");
  const [zones] = await Promise.all([pZones])

  const stringDate = "2024-08-15";
  console.log(dateToISOString(stringDate))

  return (
    <main>
      {
        zones.data && (
          <TestSelect 
            list={zones.data}
            dict={{
              select: {
                label: "sandro",
                combobox: {
                  select: "seleziona",
                  search: "cercar",
                  empty: "fottiti"
                },
              },
              validation: { 
                not_found: "fottiti di buovo" 
              },
            }}
            name="sandro"
          />
        )
      }
      <ZoneForm 
        form={{
          formName:"gennarone",
          initialState: defaultZoneFormState,
          formAction: zoneAddFormAction,
          //notifyFormSent?: Dispatch<SetStateAction<boolean>>;
          //refreshItemList?: (item: Entity) => Promise<void>;
          //FormFields: React.FunctionComponent;
        }}
        dict={{
          name: {
            label:"sandrone",
            placeholder: "daje",
            validation: {
              empty:"empty",
              max:"max",
              min:"min",
              type:"type",
              valid:"valid",
            },
          },
          button: {
            active: "prememe",
            pending: "pesoso"
          }

        }}
      />
    </main>
  )
}
