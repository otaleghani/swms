import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { defaultZoneFormState, Zones } from "@/app/lib/types/data/zones";
import TestSelect from "@/app/ui/modules/zones/test/SelectTest";
import { zoneAddFormAction } from "@/app/ui/modules/zones/create/actions";
import { Aisles, defaultAisleFormState } from "@/app/lib/types/data/aisles";
import {aisleCreateFormAction} from "@/app/ui/modules/aisles/create/actions";
import FormPattern from "@/app/ui/patterns/form/FormPattern";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import PositionSelectField from "@/app/ui/modules/positions/PositionSelectField";
import PositionSelectFieldWithAdd from "@/app/ui/modules/positions/PositionSelectFieldWithAdd";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  const pZones = retrieve("Zones");
  const pAisles = retrieve("Aisles");
  const [zones, aisles] = await Promise.all([pZones, pAisles])

  const stringDate = "2024-08-15";

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

      <FormPattern<"Zone"> 
        type="Zone"
        form={{
          formName: "NOMEFORM",
          initialState: {
            ...defaultZoneFormState,
            result: {
              ...defaultZoneFormState.result,
              name: "default value"
            }
          },
          formAction: zoneAddFormAction,
          // notifyFormSent
          // refreshItemList
        }}
        self={{
          fields: {
            ...fieldsDefaultProps,
            name: {
              dict: {
                label: "sandrone",
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
              active: "attivo",
              pending: "pendivo"
            },
          }
        }}
      />


      {
      //<ZoneForm 
      //  self={{
      //    dict: {
      //      name: {
      //        label:"sandrone",
      //        placeholder: "daje",
      //        validation: {
      //          empty:"empty",
      //          max:"max",
      //          min:"min",
      //          type:"type",
      //          valid:"valid",
      //        },
      //      },
      //      button: {
      //        active: "prememe",
      //        pending: "pesoso"
      //      }
      //    },
      //    form: {
      //      formName:"gennarone",
      //      initialState: defaultZoneFormState,
      //      formAction: zoneAddFormAction,
      //    }
      //  }}
      ///>
      //
      // <ZoneBulkForm
      //   self={{
      //     form: {
      //       formName:"gennarone2",
      //       initialState: defaultZoneBulkFormState,
      //       formAction: zoneAddBulkFormAction,
      //     },
      //     dict: {
      //       number: {
      //         label:"sandrone",
      //         placeholder: "daje",
      //         validation: {
      //           empty:"empty",
      //           max:"max",
      //           min:"min",
      //           type:"type",
      //           valid:"valid",
      //         },
      //       },
      //       button: {
      //         active: "prememe",
      //         pending: "pesoso"
      //       }
      //     }
      //   }}
      // />
      }
      <h1 className="text-2xl">AisleForm</h1>

      {
      //<AisleForm 
      //  self={{
      //    dict: {
      //      name: {
      //        label:"sandrone",
      //        placeholder: "daje",
      //        validation: {
      //          empty:"empty",
      //          max:"max",
      //          min:"min",
      //          type:"type",
      //          valid:"valid",
      //        },
      //      },
      //      button: {
      //        active: "prememe",
      //        pending: "pesoso"
      //      }
      //    },
      //    form: {
      //      formName:"gennarone3",
      //      initialState: defaultAisleFormState,
      //      formAction: aisleCreateFormAction,
      //    }
      //  }}
      //  propsPositionSelect={{
      //    fields: {
      //      zone: {
      //        propsSelectField: {
      //          dict: {
      //            select: {
      //              label: "sandro",
      //              combobox: {
      //                select: "seleziona",
      //                search: "cercar",
      //                empty: "fottiti"
      //              },
      //            },
      //            validation: {
      //              not_found: "sus",
      //            }
      //          },
      //          errors: [],
      //          list: zones.data as Zones,
      //        },
      //        propsAddDialog: {
      //          propsForm: {
      //            dict: {
      //              name: {
      //                label:"sandrone",
      //                placeholder: "daje",
      //                validation: {
      //                  empty:"empty",
      //                  max:"max",
      //                  min:"min",
      //                  type:"type",
      //                  valid:"valid",
      //                },
      //              },
      //              button: {
      //                active: "sus",
      //                pending: "sis",
      //              }
      //            },
      //          },
      //          self: {
      //            triggerType: "icon",
      //            dict: {
      //              title: "Titolone",
      //              description: "descriziazione",
      //              clear: "sas",
      //              trigger: {
      //                label: "sus",
      //              }
      //            }
      //          }
      //        },
      //      }
      //    }
      //  }}
      ///>
      }
      
      
      <DialogFormPattern<"Aisle">
        self={{
          triggerType: "icon",
          dict: {
            title: "Some dialog",
            description: "PREMIMI TUTTO",
            trigger: {label: "ANVEDI"},
            clear: "NANDO"
          }
        }}
        formPattern={{
          type: "Aisle",
          form: {
            formName: "TESTDIALOGAISLE",
            initialState: defaultAisleFormState,
            formAction: aisleCreateFormAction,
            // notifyFormSent
            // refreshItemList
          },
          self: {
            fields: {
              ...fieldsDefaultProps,
              name: {
                dict: {
                  label: "sandrone",
                  placeholder: "daje",
                  validation: {
                    empty:"empty",
                    max:"max",
                    min:"min",
                    type:"type",
                    valid:"valid",
                  },
                },
              },
              zone: {
                //AddDialog: {
                //  self: {
                //    triggerType: "icon",
                //    dict: {
                //      title: "zone aggiungi ",
                //      description: "uga buga",
                //      trigger: { label: "inutilizzazo" },
                //      clear: "clearami",
                //    },
                //  },
                //  FormPattern: {
                //    type:"Zone",
                //    form: {
                //      formName: "TESTDIALOGZONEasdfasdf",
                //      initialState: {
                //        ...defaultZoneFormState,
                //        result: {
                //          ...defaultZoneFormState.result,
                //          name: "default value"
                //        }
                //      },
                //      formAction: zoneAddFormAction,
                //      // notifyFormSent
                //      // refreshItemList
                //    },
                //    self: {
                //      fields: {
                //        ...fieldsDefaultProps,
                //        name: {
                //          dict: {
                //            label: "sandrone",
                //            placeholder: "dajes",
                //            validation: {
                //              empty:"empty",
                //              max:"max",
                //              min:"min",
                //              type:"type",
                //              valid:"valid",
                //            },
                //          },
                //          defaultValue: "",
                //          errorMessages: [],
                //        },
                //        button: {
                //          active: "attivo",
                //          pending: "pendivo"
                //        },
                //      }
                //    }
                //  }
                //},
                
                name: "Zone",
                dict: {
                  select: {
                    label: "selezionatore",
                    combobox: {
                      select: "selezioname",
                      search: "cercame",
                      empty: "vuotos",
                    },
                  },
                  validation: { not_found: "NUN l'HO TROVATO"},
                },
                list: zones.data as Zones,
              },

              button: {
                active: "attivo",
                pending: "pendivo"
              },
            }
          } 
        }}
      />
      

      {
      //<DialogFormPattern<"Zone"> 
      //  self={{
      //    triggerType: "icon",
      //    dict: {
      //      title: "Some dialog",
      //      description: "PREMIMI TUTTO",
      //      trigger: {label: "ANVEDI"},
      //      clear: "NANDO"
      //    }
      //  }}
      //  formPattern={{
      //    type: "Zone",
      //    form: {
      //      formName: "TESTDIALOGZONEDUE",
      //      initialState: defaultZoneFormState,
      //      formAction: zoneAddFormAction,
      //      // notifyFormSent
      //      // refreshItemList
      //    },
      //    self: {
      //      fields: {
      //        ...fieldsDefaultProps,
      //        name: {
      //          dict: {
      //            label: "sandrone",
      //            placeholder: "daje",
      //            validation: {
      //              empty:"empty",
      //              max:"max",
      //              min:"min",
      //              type:"type",
      //              valid:"valid",
      //            },
      //          },
      //          defaultValue: "sandroneDefaultValue",
      //          errorMessages: [],
      //        },
      //        button: {
      //          active: "attivo",
      //          pending: "pendivo"
      //        },
      //      }
      //    } 
      //  }}
      ///>
      }

      {
      // <FormPattern<"Aisle"> props={{
      //   type: "Aisle",
      //   self: {
      //     dict: {
      //       name: {
      //         label:"sandrone",
      //         placeholder: "daje",
      //         validation: {
      //           empty:"empty",
      //           max:"max",
      //           min:"min",
      //           type:"type",
      //           valid:"valid",
      //         },
      //       },
      //       button: {
      //         active: "prememe",
      //         pending: "pesoso"
      //       }
      //     },
      //     form: {
      //       formName:"gennarone3",
      //       initialState: defaultAisleFormState,
      //       formAction: aisleCreateFormAction,
      //     }
      //   },
      //   propsPositionSelect: {
      //     fields: {
      //       zone: {
      //         propsSelectField: {
      //           dict: {
      //             select: {
      //               label: "sandro",
      //               combobox: {
      //                 select: "seleziona",
      //                 search: "cercar",
      //                 empty: "fottiti"
      //               },
      //             },
      //             validation: {
      //               not_found: "sus",
      //             }
      //           },
      //           errors: [],
      //           list: zones.data as Zones,
      //         },
      //         propsAddDialog: {
      //           propsForm: {
      //             dict: {
      //               name: {
      //                 label:"sandrone",
      //                 placeholder: "daje",
      //                 validation: {
      //                   empty:"empty",
      //                   max:"max",
      //                   min:"min",
      //                   type:"type",
      //                   valid:"valid",
      //                 },
      //               },
      //               button: {
      //                 active: "sus",
      //                 pending: "sis",
      //               }
      //             },
      //           },
      //           self: {
      //             triggerType: "icon",
      //             dict: {
      //               title: "Titolone",
      //               description: "descriziazione",
      //               clear: "sas",
      //               trigger: {
      //                 label: "sus",
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }}/>
      }
      <PositionSelectFieldWithAdd
        fields={{
            zone: {
              formDialog: {
                self: {}
              },
              errorMessages: [],
              select: {
                name: "Zone",
                list: zones.data as Zones,
                dict: {
                  select: {
                    label: "selezioname",
                    combobox: {
                      select: "selezizizo",
                      search: "cercatoceccato",
                      empty: "vuotosvuotatopalle",
                    }
                  },
                  validation: {
                    not_found: "trovava",
                  }
                }
              }
          },
          aisle: {
            errorMessages: [],
            select: {
              name: "Aisle",
              list: aisles.data as Aisles,
              dict: {
                select: {
                  label: "selezioname",
                  combobox: {
                    select: "selezizizo",
                    search: "cercatoceccato",
                    empty: "vuotosvuotatopalle",
                  }
                },
                validation: {
                  not_found: "trovava",
                }
              }
            }
          }
        }}
      />
      <PositionSelectField 
        fields={{
            zone: {
              errorMessages: [],
              select: {
                name: "Zone",
                list: zones.data as Zones,
                dict: {
                  select: {
                    label: "selezioname",
                    combobox: {
                      select: "selezizizo",
                      search: "cercatoceccato",
                      empty: "vuotosvuotatopalle",
                    }
                  },
                  validation: {
                    not_found: "trovava",
                  }
                }
              }
          },
          aisle: {
            errorMessages: [],
            select: {
              name: "Aisle",
              list: aisles.data as Aisles,
              dict: {
                select: {
                  label: "selezioname",
                  combobox: {
                    select: "selezizizo",
                    search: "cercatoceccato",
                    empty: "vuotosvuotatopalle",
                  }
                },
                validation: {
                  not_found: "trovava",
                }
              }
            }
          }
        }}
      />

    </main>
  )
}
