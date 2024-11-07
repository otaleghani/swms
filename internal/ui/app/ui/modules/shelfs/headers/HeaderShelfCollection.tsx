// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import DialogShelfCreateBulk from "../dialogs/DialogShelfCreateBulk";

interface Props {
  locale: Locale
}

export default async function HeaderShelfCollection({
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const zones = await retrieve({
    request: "Zones",
    paginationOff: "true",
  });
  const aisles = await retrieve({
    request: "Aisles",
    paginationOff: "true",
  });
  const racks = await retrieve({
    request: "Racks",
    paginationOff: "true",
  });

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.shelf.header.title}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
        <DialogShelfCreateBulk 
          fields={{
            zone: {
              name: "Zone",
              list: zones.data ? zones.data : [],
              dict: {...dict.form.fields.zones}
            },
            aisle: {
              name: "Aisle",
              list: aisles.data ? aisles.data : [],
              dict: {...dict.form.fields.aisles}
            },
            rack: {
              name: "Rack",
              list: racks.data ? racks.data : [],
              dict: {...dict.form.fields.racks}
            },
            quantity: {dict: dict.form.fields.quantity},
            button: dict.form.buttons.add
          }}
          dict={dict.shelf.dialogs.addBulk}
        />
      </>
    );
  };

  return (
    <HeaderWrapper 
      Left={HeaderWrapperLeft}
      Right={HeaderWrapperRight}
    />
  );
};
