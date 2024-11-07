// Actions
import { getDictionary } from "@/lib/dictionaries";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import DialogCategoryCreate from "../dialogs/DialogCategoryCreate";

interface Props {
  locale: Locale
}

export default async function HeaderCategoryCollection({
  locale,
}: Props) {
  const dict = await getDictionary(locale);

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.category.header.title}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
        <DialogCategoryCreate
          dict={dict.category.dialogs.add}
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
