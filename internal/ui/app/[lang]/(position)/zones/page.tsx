/** Actions and defaults */
import { getDictionary, Locale } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { defaultZonesBulkFormState, ZonesWithExtra } from "@/app/lib/types/data/zones";

/** Components */
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";

/** Types and interfaces */
import { DefaultPageProps } from "@/app/lib/types/misc";
import ListZonesWithExtra from "@/app/ui/modules/zones/list/ListZonesWithExtra";
import { Suspense } from "react";
import PaginationPattern from "@/app/ui/patterns/PaginationPattern";
import TestListZones from "@/app/ui/modules/zones/TestListZones";
//const TestListZones = dynamic(() => import("@/app/ui/modules/zones/TestListZones"), { ssr: false })

export default async function ZonePage({ 
  params, 
  searchParams 
}: DefaultPageProps) {
  // listen to the changes

  const dict = await getDictionary(params.lang as Locale);
  const pZonesWithExtra = retrieve("ZonesWithExtra");
  const pZones = retrieve(
    "Zones",
    searchParams.page,
    searchParams.perPage,
  );

  const [zonesWithExtra, zones] = await Promise.all([pZonesWithExtra, pZones]);

  const Loading = () => (
    <>helo</>
  )

  return (
    <>
      <HeaderWrapper 
        Left={() => {
          return (
            <h1>{dict.zone.header.title}</h1>
          )
        }}
        Right={() => {
          return (
            <DialogFormPattern<"ZonesBulk"> 
              showButton
              self={{
                triggerType: "button",
                dict: dict.zone.dialogs.addBulk
              }}
              formPattern={{
                type: "ZonesBulk",
                self: {
                  fields: {
                    ...fieldsDefaultProps,
                    quantity: {
                      dict: dict.form.fields.quantity
                    },
                    button: dict.form.buttons.add
                  },
                },
                form: {
                  formName: "ZoneAddBulk",
                  formAction: createFormAction,
                  initialState: defaultZonesBulkFormState,
                }
              }}
            />
          )
        }}
      />
      <Suspense fallback="sus">
        <TestListZones 
          page={searchParams.page} 
          perPage={searchParams.perPage} 
        />
      </Suspense>

      {
      //<ListZonesWithExtra
      //  zonesWithExtra={zonesWithExtra.data as ZonesWithExtra}
      ///>
      }
    </>
  )
}
