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
      {
        // zones.data && (
        //   <TestSelect 
        //     list={zones.data}
        //     dict={{
        //       select: {
        //         label: "sandro",
        //         combobox: {
        //           select: "seleziona",
        //           search: "cercar",
        //           empty: "fottiti"
        //         },
        //       },
        //       validation: { 
        //         not_found: "fottiti di buovo" 
        //       },
        //     }}
        //     name="sandro"
        //   />
        // )
      }

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
              active: "attivo",
              pending: "pendivo"
            },
          }
        }}
      />

      <h1>REPLACER</h1>
      <FormPattern<"Replace">
        type="Replace"
        form={{
          formName: "REPLACER",
          initialState: {
            ...defaultReplaceFormState,
            result: {
              itemToDelete: "",
              itemThatReplaces: "",
              type: "Zone"
            }
          },
          formAction: replaceFormAction,
        }}
        self={{
          fields: {
            ...fieldsDefaultProps,
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
            id: "b545b66c-edb5-4f85-b7d8-4a6f531528b5",

            button: {
              active: "attivo",
              pending: "pendivo"
            },
          }
        }}
        showButton
      />

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

      
      <FormPattern<"ProductWithImages"> 
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
                list: clients as Client[],
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
                    formAction: createFormAction,
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
            ...defaultProductWithImagesFormState,
            result: {
              ...defaultProductWithImagesFormState.result,
              name: "default value",
              client: "nil",
              images: [],
            }
          },
          formAction: createFormAction,
          // notifyFormSent
          // refreshItemList
        }}
        type="ProductWithImages"
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
        locale="en"
        errorMessages={[]}
        defaultValue={stringDate}
      />

      <FormPattern<"Delete"> 
        self={{
          fields: {
            ...fieldsDefaultProps,
            button: {
              active: "delete",
              pending: "pendente..."
            }
          }
        }}
        form={{
          formName: "testDelete",
          initialState: {
            error: false,
            message: "",
            result: {
              id: "e31e8049-3fab-493f-a25b-b3ca19635f21",
              type: "Zone",
            },
            errorMessages: {
              id: [],
              type: [],
            }
          },
          formAction: removeFormAction,
        }}
        type="Delete"
        showButton
      />
    </main>
  )
}
