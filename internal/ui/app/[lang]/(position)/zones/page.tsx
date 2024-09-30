import { getDictionary, Locale } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { DefaultPageProps } from "@/app/lib/types/misc";
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper";
import FormPattern from "@/app/ui/patterns/form/FormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";

export default async function ZonePage({ params }: DefaultPageProps) {
  const dict = await getDictionary(params.lang as Locale);
  const pZonesWithData = retrieve("ZonesWithExtra");
  const zonesWithData = await Promise.all([pZonesWithData]);

  return (
    <>
      <HeaderWrapper 
        Left={() => {
          return (
            <h1>dict.zones</h1>
          )
        }}
        Right={() => {
          return (
            <DialogFormPattern<"ZonesBulk"> 
              self={{
                triggerType: "button",
                dict: {
                  title: "sometitle",
                  description: "somedescri",
                  trigger: { label: "sus" },
                  clear: "ses"
                }
              }}
              formPattern={{
                type: "ZonesBulk",
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    quantity: {
                      dict: {
                        label: "provame",
                        placeholder: "",
                        validation: {
                          empty: "",
                          max: "",
                          min: "",
                          type: "",
                          valid: "",
                        }
                      },
                    },
                    button: {
                      active: "asdivo",
                      pending: "alberto"
                    }
                  },
                },
                form: {
                  formName: "sus",
                  formAction: "sus" as any,
                  initialState: {
                    error: false,
                    message: "",
                    errorMessages: {
                      number: [],
                    }
                  },
                }
              }}
            />
          )
        }}
      />
    </>
  )
}

// import { getDictionary, Locale } from "@/lib/dictionaries";
// import { getZonesWithData, getZones } from "@/app/lib/requests/zones/get";
// import ZoneHeader from "@/app/ui/zones/collection_header";
// import CollectionZonesCards from "@/app/ui/zones/collection_cards";
// 
// interface ZonesPageProps {
//   params: {
//     lang: string;
//   }
// }
// 
// export default async function ZonesPage({ params }: ZonesPageProps ) {
//   const dict = await getDictionary(params.lang as Locale);
// 
//   const pZonesWithData = getZonesWithData();
//   const pZones = getZones();
//   const [zonesWithData, zones] = await Promise.all([pZonesWithData, pZones])
// 
//   return (
//     <div>
//       <ZoneHeader dict={dict.zones} lang={params.lang} />
//       <main className="p-4 grid xl:grid-cols-5 gap-2">
//         <CollectionZonesCards 
//           zones={zonesWithData} 
//           zones_collection={zones}
//           locale={params.lang}
//           dict_card={dict.zones.card}
//           dict_delete={dict.zones.delete_form}
//           dict_edit={dict.zones.edit_form}
//           dict_zone_select={dict.zones.select_field} />
//       </main>
//     </div>
//   )
// }


