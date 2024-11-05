// Actions
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { getDictionary } from "@/lib/dictionaries";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultZonesBulkFormState } from "@/app/lib/types/data/zones";

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
      <DialogFormPattern<"ZonesBulk"> 
        showButton
        self={{
          triggerType: "button",
          dict: dict.zone.dialogs.addBulk
        }}
        formPattern={{
          type: "ZonesBulk",
          self: {
            fields: {
              ...fieldsDefaultProps,
              quantity: {dict: dict.form.fields.quantity},
              button: dict.form.buttons.add
            },
          },
          form: {
            formName: "ZoneAddBulk",
            formAction: createFormAction,
            initialState: defaultZonesBulkFormState,
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
