import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import { dateToISOString, dateToLocaleDateString, dateToLocaleString, dateToLocaleTimeString } from "@/app/lib/validation/dates";
import SelectFieldPattern from "@/app/ui/patterns/form/select/SelectFieldPattern";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { defaultZoneBulkFormState, defaultZoneFormState, Zones } from "@/app/lib/types/data/zones";
import { Zone } from "@/app/lib/types";
import ZoneSelectField from "@/app/ui/modules/zones/misc/ZoneSelectField";
import TestSelect from "@/app/ui/modules/zones/test/SelectTest";
import ZoneForm from "@/app/ui/modules/zones/misc/ZoneForm";
import { zoneAddFormAction } from "@/app/ui/modules/zones/create/actions";
import ZoneBulkForm from "@/app/ui/modules/zones/misc/ZoneBulkCreateForm";
import { zoneAddBulkFormAction } from "@/app/ui/modules/zones/create/actions";
import AisleForm from "@/app/ui/modules/aisles/misc/AisleForm";
import { Aisles, defaultAisleFormState } from "@/app/lib/types/data/aisles";
import {aisleCreateFormAction} from "@/app/ui/modules/aisles/create/actions";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  const pZones = retrieve("Zones");
  const pAisles = retrieve("Aisles");
  const [zones, aisles] = await Promise.all([pZones, pAisles])

  const stringDate = "2024-08-15";
  // console.log(dateToISOString(stringDate))

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
        self={{
          dict: {
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
          },
          form: {
            formName:"gennarone",
            initialState: defaultZoneFormState,
            formAction: zoneAddFormAction,
          }
        }}
      />
      <ZoneBulkForm
        self={{
          form: {
            formName:"gennarone2",
            initialState: defaultZoneBulkFormState,
            formAction: zoneAddBulkFormAction,
          },
          dict: {
            number: {
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
          }
        }}
      />
      <h1 className="text-2xl">AisleForm</h1>

      <AisleForm 

        self={{
          dict: {
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
          },
          form: {
            formName:"gennarone3",
            initialState: defaultAisleFormState,
            formAction: aisleCreateFormAction,
          }
        }}

        propsPositionSelect={{
          fields: {
            zone: {
              propsSelectField: {
                dict: {
                  select: {
                    label: "sandro",
                    combobox: {
                      select: "seleziona",
                      search: "cercar",
                      empty: "fottiti"
                    },
                  },
                  validation: {
                    not_found: "sus",
                  }
                },
                errors: [],
                list: zones.data as Zones,
              },
              propsAddDialog: {
                propsForm: {
                  dict: {
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
                      active: "sus",
                      pending: "sis",
                    }
                  },
                },
                self: {
                  triggerType: "icon",
                  dict: {
                    title: "Titolone",
                    description: "descriziazione",
                    clear: "sas",
                    trigger: {
                      label: "sus",
                    }
                  }
                }
              },
            }
          }
        }}

      />
    </main>
  )
}
