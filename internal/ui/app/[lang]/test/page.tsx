import PositionSelectFieldWithAdd from "@/app/ui/modules/positions/PositionSelectFieldWithAdd";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { Zones } from "@/app/lib/types/data/zones";
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { emptyZone } from "@/app/lib/types/data/zones";
import SheetAddVariant from "@/app/ui/modules/variants/SheetAddVariant";

export default async function PageTest() {
  const dict = await getDictionary("en");

  const zones = await retrieve({ request: "Zones", paginationOff: "true" });
  const aisles = await retrieve({ request: "Aisles", paginationOff: "true" });
  const racks = await retrieve({ request: "Racks", paginationOff: "true" });
  const shelfs = await retrieve({ request: "Shelfs", paginationOff: "true" });

  return (
    <>
        <PositionSelectFieldWithAdd 
          fields={{ 
            zone: {
              select: {
                list: zones.data as Zones,
                dict: dict.form.fields.zones,
                name: "Zone",
              },

              formDialog: { 
                self: {
                  triggerType: "iconAdd",
                  dict: dict.zone.dialogs.add,
                },
                showButton: true,
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
                    initialState: defaultZoneFormState,
                    formAction: createFormAction,
                  },
                  type: "Zone"
                  }
                },
              errorMessages: [],
              defaultValue: emptyZone,
              },

            }}
        />
        <SheetAddVariant />
    </>
  )
}
