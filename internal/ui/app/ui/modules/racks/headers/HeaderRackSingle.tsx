// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogRackEdit from "../dialogs/DialogRackEdit";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Rack, Racks } from "@/app/lib/types/data/racks";
import { Zones } from "@/app/lib/types/data/zones";
import DialogRackCreateBulk from "../../racks/dialogs/DialogRackCreateBulk";
import { Aisles } from "@/app/lib/types/data/aisles";
import DialogShelfCreateBulk from "../../shelfs/dialogs/DialogShelfCreateBulk";

interface Props {
  locale: Locale;
  rack: Rack
}

export default async function HeaderRackSingle({
  locale,
  rack
}: Props) {
  const dict = await getDictionary(locale);
  const racks = await retrieve({
    request: "Racks",
    paginationOff: "true",
  });
  const aisles = await retrieve({
    request: "Aisles",
    paginationOff: "true",
  });
  const zones = await retrieve({
    request: "Zones",
    paginationOff: "true",
  });

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[ {url: "/racks", label: dict.rack.header.title} ]}
        currentItem={rack.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <div className="flex gap-2 items-center">
        <DialogRackEdit 
          rack={rack}
          dict={dict.rack.dialogs.edit}
          fields={{
            name: {dict: dict.form.fields.name},
            aisle: {
              list: aisles.data as Aisles,
              dict: dict.form.fields.aisles,
              name: "Aisle",
            },
            zone: {
              list: zones.data as Zones,
              dict: dict.form.fields.zones,
              name: "Zone",
            },
            button: dict.form.buttons.submit,
          }}
        />

        <DialogShelfCreateBulk
          dict={dict.shelf.dialogs.addBulk}
          fields={{
            quantity: {dict: dict.form.fields.quantity},
            zone: {
              dict: dict.form.fields.zones,
              list: zones.data as Zones,
              name: "Zone",
            },
            aisle: {
              dict: dict.form.fields.aisles,
              list: aisles.data as Aisles,
              name: "Aisle",
            },
            rack: {
              dict: dict.form.fields.racks,
              list: racks.data as Racks,
              name: "Rack",
            },
            button: dict.form.buttons.add
          }}
          relatedZone={rack.zone}
          relatedAisle={rack.aisle}
          relatedRack={rack.id}
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
