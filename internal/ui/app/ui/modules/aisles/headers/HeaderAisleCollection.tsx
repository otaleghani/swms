// Actions
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultAislesBulkFormState } from "@/app/lib/types/data/aisles";

interface Props {
  locale: Locale
}

export default async function HeaderAisleCollection({
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const zones = await retrieve({
    request: "Zones",
    paginationOff: "true",
  });

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.aisle.header.title}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
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
              zone: {
                name: "Zone",
                list: zones.data ? zones.data : [],
                dict: {...dict.form.fields.zones}
              },
              quantity: {dict: dict.form.fields.quantity},
              button: dict.form.buttons.add
            },
          },
          form: {
            formName: "AisleAddBulk",
            formAction: createFormAction,
            initialState: defaultAislesBulkFormState,
          }
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
