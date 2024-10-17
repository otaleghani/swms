import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { defaultZoneFormState, Zones } from "@/app/lib/types/data/zones";
import TestSelect from "@/app/ui/modules/zones/test/SelectTest";
import { Aisles, defaultAisleFormState } from "@/app/lib/types/data/aisles";
import {aisleCreateFormAction} from "@/app/ui/modules/aisles/create/actions";
import FormPattern from "@/app/ui/patterns/form/FormPattern";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import PositionSelectField from "@/app/ui/modules/positions/PositionSelectField";
import PositionSelectFieldWithAdd from "@/app/ui/modules/positions/PositionSelectFieldWithAdd";
import { defaultProductFormState, defaultProductWithImagesFormState } from "@/app/lib/types/data/products";
import { Client, Clients, defaultClientFormState } from "@/app/lib/types/data/clients";
import { DatePickerPattern } from "@/app/ui/patterns/form/input/DatePickerPattern";
import { createFormAction } from "@/app/lib/actions/create/createFormAction"
import { FormField } from "@/components/form";
import { removeFormAction } from "@/app/lib/actions/remove/removeFormAction";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  const pZones = retrieve("Zones");
  const pAisles = retrieve("Aisles");
  //const pClients = retrieve("Clients");
  const clients = [] as Clients;

  const [zones, aisles] = await Promise.all([pZones, pAisles])

  const stringDate = "2020-08-15";

  return (
    <main>

      <FormPattern<"Zone"> 
        type="Zone"
        form={{
          formName: "NOMEFORM",
          initialState: {
            ...defaultZoneFormState,
            result: {
              ...defaultZoneFormState.result,
              id: "3fa124c7-fd4e-4634-8500-ead6388b4eef",
              name: "Sandrone",
            }
          },
          formAction: updateFormAction<"Zone">,
          // notifyFormSent
          // refreshItemList
        }}
        showButton
        self={{
          fields: {
            ...fieldsDefaultProps,
            name: {
              dict: {
                label: "sandronex",
                placeholder: "dajes",
                validation: {
                  empty:"empty",
                  max:"max",
                  min:"min",
                  type:"type",
                  valid:"valid",
                },
              },
            },
            button: {
              active: "MODIFICA",
              pending: "pendivo"
            },
          }
        }}
      />

      <FormPattern<"Zone"> 
        type="Zone"
        form={{
          formName: "NOMEFORMAGGIUNGI",
          initialState: {
            ...defaultZoneFormState,
          },
          formAction: createFormAction<"Zone">,
        }}
        showButton
        self={{
          fields: {
            ...fieldsDefaultProps,
            name: {
              dict: {
                label: "sandronex",
                placeholder: "dajes",
                validation: {
                  empty:"empty",
                  max:"max",
                  min:"min",
                  type:"type",
                  valid:"valid",
                },
              },
            },
            button: {
              active: "AGGIUNGI",
              pending: "pendivo"
            },
          }
        }}
      />

      <h1>REPLACER</h1>
      <h1 className="text-2xl">AisleForm</h1>
      
    </main>
  )
}
