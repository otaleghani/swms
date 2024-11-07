// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import DialogRackCreateBulk from "../dialogs/DialogRackCreateBulk";

interface Props {
  locale: Locale
}

export default async function HeaderRackCollection({
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

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.rack.header.title}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
        <DialogRackCreateBulk 
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
            quantity: {dict: dict.form.fields.quantity},
            button: dict.form.buttons.add
          }}
          dict={dict.rack.dialogs.addBulk}
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
