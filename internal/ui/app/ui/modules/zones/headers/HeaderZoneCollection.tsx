// Actions
import { getDictionary } from "@/lib/dictionaries";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import DialogZoneCreateBulk from "../dialogs/DialogZoneCreateBulk";

interface Props {
  locale: Locale
}

export default async function HeaderZoneCollection({
  locale,
}: Props) {
  const dict = await getDictionary(locale);

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.zone.header.title}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
        <DialogZoneCreateBulk 
          dict={dict.zone.dialogs.addBulk}
          fields={{
            quantity: {dict: dict.form.fields.quantity},
            button: dict.form.buttons.add,
          }}
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
