//import { getDictionary } from "@/lib/dictionaries";
//import { Locale } from "@/lib/dictionaries";
//import { retrieve } from "@/app/lib/requests/generics/retrieve";
//import { defaultZoneFormState, Zones } from "@/app/lib/types/data/zones";
//import FormPattern from "@/app/ui/patterns/form/FormPattern";
//import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
//import { createFormAction } from "@/app/lib/actions/create/createFormAction"
//import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
//import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
//import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
//
//export default async function TestingPage( {params}: {params: {lang: string}}) {
//  const dict = await getDictionary(params.lang as Locale);
//
//
//  const pZones = retrieve("Zones");
//  const pAisles = retrieve("Aisles");
//
//  //const [zones, aisles] = await Promise.all([pZones, pAisles])
//
//  const stringDate = "2020-08-15";
//
//  return (
//    <main>
//
//      <FormPattern<"Zone"> 
//        type="Zone"
//        form={{
//          formName: "NOMEFORM",
//          initialState: {
//            ...defaultZoneFormState,
//            result: {
//              ...defaultZoneFormState.result,
//              id: "3fa124c7-fd4e-4634-8500-ead6388b4eef",
//              name: "Sandrone",
//            }
//          },
//          formAction: updateFormAction<"Zone">,
//          // notifyFormSent
//          // refreshItemList
//        }}
//        showButton
//        self={{
//          fields: {
//            ...fieldsDefaultProps,
//            name: {
//              dict: {
//                label: "sandronex",
//                placeholder: "dajes",
//                validation: {
//                  empty:"empty",
//                  max:"max",
//                  min:"min",
//                  type:"type",
//                  valid:"valid",
//                },
//              },
//            },
//            button: {
//              active: "MODIFICA",
//              pending: "pendivo"
//            },
//          }
//        }}
//      />
//
//      <FormPattern<"Zone"> 
//        type="Zone"
//        form={{
//          formName: "NOMEFORMAGGIUNGI",
//          initialState: {
//            ...defaultZoneFormState,
//          },
//          formAction: createFormAction<"Zone">,
//        }}
//        showButton
//        self={{
//          fields: {
//            ...fieldsDefaultProps,
//            name: {
//              dict: {
//                label: "sandronex",
//                placeholder: "dajes",
//                validation: {
//                  empty:"empty",
//                  max:"max",
//                  min:"min",
//                  type:"type",
//                  valid:"valid",
//                },
//              },
//            },
//            button: {
//              active: "AGGIUNGI",
//              pending: "pendivo"
//            },
//          }
//        }}
//      />
//
//      <h1>REPLACER</h1>
//      
//      <FormPattern<"Replace">
//        type="Replace"
//        form={{
//          formName: "REPLACER",
//          initialState: {
//            ...defaultReplaceFormState,
//            result: {
//              itemToDelete: "",
//              itemThatReplaces: "",
//              type: "Zone"
//            }
//          },
//          formAction: replaceFormAction,
//        }}
//        self={{
//          fields: {
//            ...fieldsDefaultProps,
//            zone: {
//              name: "Zone",
//              dict: {
//                select: {
//                  label: "selezionatore",
//                  combobox: {
//                    select: "selezioname",
//                    search: "cercame",
//                    empty: "vuotos",
//                  },
//                },
//                validation: { not_found: "NUN l'HO TROVATO"},
//              },
//              list: zones.data as Zones,
//            },
//            id: "b545b66c-edb5-4f85-b7d8-4a6f531528b5",
//
//            button: {
//              active: "attivo",
//              pending: "pendivo"
//            },
//          }
//        }}
//        showButton
//      />
//    </main>
//  )
//}
