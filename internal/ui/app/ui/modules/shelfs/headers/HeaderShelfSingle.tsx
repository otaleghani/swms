// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogShelfEdit from "../dialogs/DialogShelfEdit";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Shelf } from "@/app/lib/types/data/shelfs";
import { Zones } from "@/app/lib/types/data/zones";
import DialogShelfCreateBulk from "../../shelfs/dialogs/DialogShelfCreateBulk";
import { Aisles } from "@/app/lib/types/data/aisles";
import { Racks } from "@/app/lib/types/data/racks";

interface Props {
  locale: Locale;
  shelf: Shelf
}

export default async function HeaderShelfSingle({
  locale,
  shelf
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
        itemsList={[ {url: "/shelfs", label: dict.shelf.header.title} ]}
        currentItem={shelf.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <div className="flex gap-2 items-center">
        <DialogShelfEdit 
          shelf={shelf}
          dict={dict.shelf.dialogs.edit}
          fields={{
            name: {dict: dict.form.fields.name},
            rack: {
              list: racks.data as Racks,
              dict: dict.form.fields.racks,
              name: "Rack",
            },
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
          relatedZone={shelf.zone}
          relatedAisle={shelf.aisle}
          relatedRack={shelf.rack}
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
