// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogZoneEdit from "../dialogs/DialogZoneEdit";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Zone, Zones } from "@/app/lib/types/data/zones";

// Default values
import DialogAisleCreateBulk from "../../aisles/dialogs/DialogAisleCreateBulk";

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
        <DialogZoneEdit 
          zone={zone}
          dict={dict.zone.dialogs.edit}
          fields={{
            name: {dict: dict.form.fields.name},
            button: dict.form.buttons.submit,
          }}
        />

        <DialogAisleCreateBulk
          dict={dict.aisle.dialogs.addBulk}
          fields={{
            quantity: {dict: dict.form.fields.quantity},
            zone: {
              dict: dict.form.fields.zones,
              list: zones.data as Zones,
              name: "Zone",
            },
            button: dict.form.buttons.add
          }}
          relatedZone={zone.id}
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
