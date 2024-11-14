// Actions
import { getDictionary } from "@/lib/dictionaries";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import DialogSupplierCreate from "../dialogs/DialogSupplierCreate";

interface Props {
  locale: Locale
}

export default async function HeaderSupplierCollection({
  locale,
}: Props) {
  const dict = await getDictionary(locale);

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.supplier.header.title}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
        <DialogSupplierCreate
          dict={dict.supplier.dialogs.add}
          fields={{
            name: {dict: dict.form.fields.name},
            description: {dict: dict.form.fields.description},
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
