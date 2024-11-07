// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";

// Default values
import DialogSubcategoryCreate from "../dialogs/DialogSubcategoryCreate";

interface Props {
  locale: Locale
}

export default async function HeaderSubcategoryCollection({
  locale,
}: Props) {
  const dict = await getDictionary(locale);
  const categories = await retrieve({
    request: "Categories",
    paginationOff: "true",
  })

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
        <DialogSubcategoryCreate
          dict={dict.category.dialogs.add}
          fields={{
            name: {dict: dict.form.fields.name},
            description: {dict: dict.form.fields.description},
            category: {
              list: categories.data ? categories.data : [],
              dict: dict.form.fields.categories,
              name: "Category",
            },
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
