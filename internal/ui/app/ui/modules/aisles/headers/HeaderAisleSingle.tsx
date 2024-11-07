// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogAisleEdit from "../dialogs/DialogAisleEdit";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Aisle, Aisles } from "@/app/lib/types/data/aisles";
import { Zones } from "@/app/lib/types/data/zones";
import DialogRackCreateBulk from "../../racks/dialogs/DialogRackCreateBulk";

interface Props {
  locale: Locale;
  aisle: Aisle
}

export default async function HeaderAisleSingle({
  locale,
  aisle
}: Props) {
  const dict = await getDictionary(locale);
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
        itemsList={[ {url: "/aisles", label: dict.aisle.header.title} ]}
        currentItem={aisle.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <div className="flex gap-2 items-center">
        <DialogAisleEdit 
          aisle={aisle}
          dict={dict.aisle.dialogs.edit}
          fields={{
            name: {dict: dict.form.fields.name},
            zone: {
              list: zones.data as Zones,
              dict: dict.form.fields.zones,
              name: "Zone",
            },
            button: dict.form.buttons.submit,
          }}
        />

        <DialogRackCreateBulk 
          dict={dict.aisle.dialogs.addBulk}
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
            button: dict.form.buttons.add
          }}
          relatedZone={aisle.zone}
          relatedAisle={aisle.id}
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
