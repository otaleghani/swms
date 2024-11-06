// Actions
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"
import DialogZoneEdit from "../dialogs/DialogZoneEdit";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { defaultZoneFormState, Zone, Zones } from "@/app/lib/types/data/zones";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultAislesBulkFormState } from "@/app/lib/types/data/aisles";

interface Props {
  locale: Locale;
  zone: Zone
}

export default async function HeaderZoneSingle({
  locale,
  zone
}: Props) {
  const dict = await getDictionary(locale);
  const zones = await retrieve({
    request: "Zones",
    paginationOff: "true",
  })

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[ {url: "/zones", label: dict.zone.header.title} ]}
        currentItem={zone.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <div className="flex gap-2 items-center">
        <DialogZoneEdit zone={zone} locale={locale} />

        <DialogFormPattern<"AislesBulk"> 
          showButton
          self={{
            triggerType: "button",
            dict: dict.aisle.dialogs.addBulk
          }}
          formPattern={{
            type: "AislesBulk",
            self: {
              fields: {
                ...fieldsDefaultProps,
                quantity: {dict: dict.form.fields.quantity},
                zone: {
                  dict: dict.form.fields.zones,
                  list: zones.data as Zones,
                  name: "Zone",
                },
                button: dict.form.buttons.add
              },
            },
            form: {
              formName: "AisleAddBulk",
              formAction: createFormAction,
              initialState: {
                ...defaultAislesBulkFormState,
                result: {
                  quantity: 0,
                  zone: zone.id as string,
                }
              }
            }
          }}
        />
      </div>
    );
  };

  return (
    <HeaderWrapper 
      Left={HeaderWrapperLeft}
      Right={HeaderWrapperRight}
    />
  );
};
