// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogSubcategoryEdit from "../dialogs/DialogSubcategoryEdit";
import DialogSubcategoryReplace from "../dialogs/DialogSubcategoryReplace";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Subcategory } from "@/app/lib/types/data/subcategories";

// Default values

interface Props {
  locale: Locale;
  subcategory: Subcategory
}

export default async function HeaderSubcategorySingle({
  locale,
  subcategory
}: Props) {
  const dict = await getDictionary(locale);
  const categories = await retrieve({
    request: "Categories",
    paginationOff: "true",
  });
  const subcategories = await retrieve({
    request: "Subcategories",
    paginationOff: "true",
  });

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[ {url: "/subcategories", label: dict.subcategory.header.title} ]}
        currentItem={subcategory.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <div className="flex gap-2 items-center">
        <DialogSubcategoryEdit 
          subcategory={subcategory}
          dict={dict.category.dialogs.edit}
          fields={{
            name: {dict: dict.form.fields.name},
            description: {dict: dict.form.fields.description},
            category: {
              list: categories.data ? categories.data : [],
              name: "Category",
              dict: dict.form.fields.categories,
            },
            button: dict.form.buttons.submit,
          }}
        />

        <DialogSubcategoryReplace 
          subcategory={subcategory}
          fields={{
            category: {
              list: categories.data ? categories.data : [],
              name: "Category",
              dict: dict.form.fields.categories,
            },
            subcategory: {
              list: subcategories.data ? subcategories.data : [],
              name: "Subcategory",
              dict: dict.form.fields.subcategories,
            },
            button: dict.form.buttons.submit,
          }}
          dict={dict.subcategory.dialogs.replace}
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
