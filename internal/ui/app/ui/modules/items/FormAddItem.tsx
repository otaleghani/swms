import { getDictionary, Locale } from "@/lib/dictionaries";
import FormAddItemClient from "./FormAddItemClient";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { defaultZoneFormState, Zones } from "@/app/lib/types/data/zones";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { Aisles, defaultAisleFormState } from "@/app/lib/types/data/aisles";
import { defaultRackFormState, Racks } from "@/app/lib/types/data/racks";
import { defaultShelfFormState, Shelfs } from "@/app/lib/types/data/shelfs";
import { Categories, defaultCategoryFormState } from "@/app/lib/types/data/categories";
import { defaultSubcategoryFormState, Subcategories } from "@/app/lib/types/data/subcategories";

interface Props {
  locale: Locale;
}

export default async function FormAddItem({
  locale,
}: Props) {
  const pDict = getDictionary(locale);

  const pZones = retrieve({ request: "Zones", paginationOff: "true" });
  const pAisles = retrieve({ request: "Aisles", paginationOff: "true" });
  const pRacks = retrieve({ request: "Racks", paginationOff: "true" });
  const pShelfs = retrieve({ request: "Shelfs", paginationOff: "true" });

  const pCategories = retrieve({ request: "Categories", paginationOff: "true" });
  const pSubcategories = retrieve({ request: "Subcategories", paginationOff: "true" });

  const [zones, aisles, racks, shelfs, categories, subcategories, dict] = 
    await Promise.all(
      [pZones, pAisles, pRacks, pShelfs, pCategories, pSubcategories, pDict]);

  return (
    <div className="xl:px-[25%]">
      <FormAddItemClient 
        dict={dict.item.form}
        fields={{
          name: { dict: dict.form.fields.name },
          description: { dict: dict.form.fields.description },
          isArchived: { dict: dict.form.fields.isArchived },
          images: { dict: dict.form.fields.images },
          identifier: { dict: dict.form.fields.identifier },
          quantity: { dict: dict.form.fields.quantity },
          length: { dict: dict.form.fields.length },
          width: { dict: dict.form.fields.width },
          height: { dict: dict.form.fields.height },
          weight: { dict: dict.form.fields.weight },

          zoneWithAdd: {
            selectField: {
              list: zones.data as Zones,
              dict: dict.form.fields.zones,
              name: "Zone",
            },
            addDialog: {
              self: {
                triggerType: "iconAdd",
                dict: dict.zone.dialogs.add,
              },
              formPattern: {
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    name: { dict: dict.form.fields.name },
                    button: dict.form.buttons.add, 
                  },
                },
                form: {
                  formName: "AddNewZone",
                  initialState: {
                    ...defaultZoneFormState,
                  },
                  formAction: createFormAction,
                },
                type: "Zone",
              },
              showButton: true,
            }
          },

          aisleWithAdd: {
            selectField: {
              list: aisles.data as Aisles,
              dict: dict.form.fields.aisles,
              name: "Aisle",
            },
            addDialog: {
              self: {
                triggerType: "iconAdd",
                dict: dict.aisle.dialogs.add,
              },
              formPattern: {
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    name: { dict: dict.form.fields.name },
                    zone: { 
                      list: zones.data as Zones,
                      dict: dict.form.fields.zones, 
                      name: "Zone",
                    },
                    button: dict.form.buttons.add, 
                  },
                },
                form: {
                  formName: "AddNewAisle",
                  initialState: defaultAisleFormState,
                  formAction: createFormAction,
                },
                type: "Aisle",
              },
              showButton: true,
            }
          },

          rackWithAdd: {
            selectField: {
              list: racks.data as Racks,
              dict: dict.form.fields.racks,
              name: "Rack",
            },
            addDialog: {
              self: {
                triggerType: "iconAdd",
                dict: dict.rack.dialogs.add,
              },
              formPattern: {
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    name: { dict: dict.form.fields.name },
                    zone: { 
                      list: zones.data as Zones,
                      dict: dict.form.fields.zones, 
                      name: "Zone",
                    },
                    aisle: { 
                      list: aisles.data as Aisles,
                      dict: dict.form.fields.aisles, 
                      name: "Aisle",
                    },
                    button: dict.form.buttons.add, 
                  },
                },
                form: {
                  formName: "AddNewRack",
                  initialState: defaultRackFormState,
                  formAction: createFormAction,
                },
                type: "Rack",
              },
              showButton: true,
            }
          },

          shelfWithAdd: {
            selectField: {
              list: shelfs.data as Shelfs,
              dict: dict.form.fields.shelfs,
              name: "Shelf",
            },
            addDialog: {
              self: {
                triggerType: "iconAdd",
                dict: dict.shelf.dialogs.add,
              },
              formPattern: {
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    name: { dict: dict.form.fields.name },
                    zone: { 
                      list: zones.data as Zones,
                      dict: dict.form.fields.zones, 
                      name: "Zone",
                    },
                    aisle: { 
                      list: aisles.data as Aisles,
                      dict: dict.form.fields.aisles, 
                      name: "Aisle",
                    },
                    rack: { 
                      list: racks.data as Racks,
                      dict: dict.form.fields.racks, 
                      name: "Rack",
                    },
                    button: dict.form.buttons.add, 
                  },
                },
                form: {
                  formName: "AddNewShelf",
                  initialState: defaultShelfFormState,
                  formAction: createFormAction,
                },
                type: "Shelf",
              },
              showButton: true,
            }
          },

          categoryWithAdd: {
            selectField: {
              list: categories.data as Categories,
              dict: dict.form.fields.categories,
              name: "Category",
            },
            addDialog: {
              self: {
                triggerType: "iconAdd",
                dict: dict.category.dialogs.add,
              },
              formPattern: {
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    name: { dict: dict.form.fields.name },
                    description: { dict: dict.form.fields.description },
                    button: dict.form.buttons.add, 
                  },
                },
                form: {
                  formName: "AddNewCategory",
                  initialState: defaultCategoryFormState,
                  formAction: createFormAction,
                },
                type: "Category",
              },
              showButton: true,
            }
          },

          subcategoryWithAdd: {
            selectField: {
              list: subcategories.data as Subcategories,
              dict: dict.form.fields.subcategories,
              name: "Subcategory",
            },
            addDialog: {
              self: {
                triggerType: "iconAdd",
                dict: dict.subcategory.dialogs.add,
              },
              formPattern: {
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    name: { dict: dict.form.fields.name },
                    description: { dict: dict.form.fields.description },
                    category: { 
                      dict: dict.form.fields.categories, 
                      list: categories.data as Categories,
                      name: "Category",
                    },
                    button: dict.form.buttons.add, 
                  },
                },
                form: {
                  formName: "AddNewSubcategory",
                  initialState: defaultSubcategoryFormState,
                  formAction: createFormAction,
                },
                type: "Subcategory",
              },
              showButton: true,
            }
          },

          variantsJSON: { data: "" },
          codesJSON: { data: "" },
          button: dict.form.buttons.add,
        }}
      />
    </div>
  )
}
