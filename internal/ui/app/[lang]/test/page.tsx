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
import { defaultProductFormState } from "@/app/lib/types/data/products";
import { Client, Clients, defaultClientFormState } from "@/app/lib/types/data/clients";
import { DatePickerPattern } from "@/app/ui/patterns/form/input/DatePickerPattern";

export default async function TestingPage( {params}: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale);

  const pZones = retrieve("Zones");
  const pAisles = retrieve("Aisles");
  const pClients = retrieve("Clients");

  const [zones, aisles, clients] = await Promise.all([pZones, pAisles, pClients])

  const stringDate = "2020-08-15";

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
      {
      //<PositionSelectFieldWithAdd
      //  fields={{
      //      zone: {
      //        formDialog: {
      //          self: {}
      //        },
      //        errorMessages: [],
      //        select: {
      //          name: "Zone",
      //          list: zones.data as Zones,
      //          dict: {
      //            select: {
      //              label: "selezioname",
      //              combobox: {
      //                select: "selezizizo",
      //                search: "cercatoceccato",
      //                empty: "vuotosvuotatopalle",
      //              }
      //            },
      //            validation: {
      //              not_found: "trovava",
      //            }
      //          }
      //        }
      //    },
      //    aisle: {
      //      errorMessages: [],
      //      select: {
      //        name: "Aisle",
      //        list: aisles.data as Aisles,
      //        dict: {
      //          select: {
      //            label: "selezioname",
      //            combobox: {
      //              select: "selezizizo",
      //              search: "cercatoceccato",
      //              empty: "vuotosvuotatopalle",
      //            }
      //          },
      //          validation: {
      //            not_found: "trovava",
      //          }
      //        }
      //      }
      //    }
      //  }}
      ///>
      }

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

      
      <FormPattern<"Product"> 
        self={{
          fields: {
            ...fieldsDefaultProps,
            images: {
              dict: {
                label: "Immagini",
                placeholder: "Placeholder",
                validation: {
                  empty:"empty",
                  max:"max",
                  min:"min",
                  type:"type",
                  valid:"valid",
                },
              },
            },
            name: {
              dict: {
                label: "Nome",
                placeholder: "Placeholder",
                validation: {
                  empty:"empty",
                  max:"max",
                  min:"min",
                  type:"type",
                  valid:"valid",
                },
              },
            },
            description: {
              dict: {
                label: "Descrizione",
                placeholder: "Placeholder",
                validation: {
                  empty:"empty",
                  max:"max",
                  min:"min",
                  type:"type",
                  valid:"valid",
                },
              },
            },
            clientWithAdd: {
              selectField: {
                name: "Client",
                dict: {
                  select: {
                    label: "clienti",
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
                list: clients.data as Client[],
              },
              addDialog: {
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
                },
                formPattern: {
                  self: {
                    fields: {
                      ...fieldsDefaultProps,
                      name: {
                        dict: {
                          label: "Nome",
                          placeholder: "Placeholder",
                          validation: {
                            empty: "empty",
                            max: "empty",
                            min: "empty",
                            type: "empty",
                            valid: "empty",
                          }
                        }
                      },
                      surname: {
                        dict: {
                          label: "Cognome",
                          placeholder: "Placeholder",
                          validation: {
                            empty: "empty",
                            max: "empty",
                            min: "empty",
                            type: "empty",
                            valid: "empty",
                          }
                        }
                      },
                      isBusiness: {
                        dict: {
                          label: "Cognome",
                          placeholder: "Placeholder",
                          validation: {
                            required: "empty",
                          },
                          isChecked: false,
                        }
                      },
                      button: {
                        active: "suuus",
                        pending: "sas",
                      }
                    }
                  },
                  type: "Client",
                  form: {
                    formName: "Formeronix",
                    initialState: defaultClientFormState,
                    formAction: zoneAddFormAction,
                  }
                }

              }
            },
            button: {
              active: "sandro",
              pending: "ses",
            }
          }
        }}
        form={{
          formName: "NOMEFORM",
          initialState: {
            ...defaultProductFormState,
            result: {
              ...defaultProductFormState.result,
              name: "default value",
              client: "nil"
            }
          },
          formAction: zoneAddFormAction,
          // notifyFormSent
          // refreshItemList
        }}
        type="Product"
      />
      <DatePickerPattern 
        field="openDate"
        dict={{
          label: "tirato",
          placeholder: "sus",
          validation: {
            empty: "",
            type: "",
            valid: "",
          }
        }}
        locale="it"
        errorMessages={[]}
        defaultValue={stringDate}
      />

    </main>
  )
}
