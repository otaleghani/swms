// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogSupplierEdit from "../dialogs/DialogSupplierEdit";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Supplier, Suppliers } from "@/app/lib/types/data/suppliers";

// Default values
//import DialogAisleCreateBulk from "../../aisles/dialogs/DialogAisleCreateBulk";

interface Props {
  locale: Locale;
  supplier: Supplier
}

export default async function HeaderSupplierSingle({
  locale,
  supplier
}: Props) {
  const dict = await getDictionary(locale);
  const suppliers = await retrieve({
    request: "Suppliers",
    paginationOff: "true",
  })

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[ {url: "/suppliers", label: dict.supplier.header.title} ]}
        currentItem={supplier.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <div className="flex gap-2 items-center">
        <DialogSupplierEdit 
          supplier={supplier}
          dict={dict.supplier.dialogs.edit}
          fields={{
            name: {dict: dict.form.fields.name},
            description: {dict: dict.form.fields.description},
            button: dict.form.buttons.submit,
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
