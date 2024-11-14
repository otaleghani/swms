// Actions
import { getDictionary } from "@/lib/dictionaries";
import { retrieve } from "@/app/lib/requests/generics/retrieve";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"
import DialogCategoryEdit from "../dialogs/DialogCategoryEdit";

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Category, Categories } from "@/app/lib/types/data/categories";

// Default values
import DialogSubcategoryCreate from "../../subcategories/dialogs/DialogSubcategoryCreate";

interface Props {
  locale: Locale;
  category: Category
}

export default async function HeaderCategorySingle({
  locale,
  category
}: Props) {
  const dict = await getDictionary(locale);
  const categories = await retrieve({
    request: "Categories",
    paginationOff: "true",
  })

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[ {url: "/categories", label: dict.category.header.title} ]}
        currentItem={category.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <div className="flex gap-2 items-center">
        <DialogCategoryEdit 
          category={category}
          dict={dict.category.dialogs.edit}
          fields={{
            name: {dict: dict.form.fields.name},
            description: {dict: dict.form.fields.description},
            button: dict.form.buttons.submit,
          }}
        />

        <DialogSubcategoryCreate
          dict={dict.aisle.dialogs.addBulk}
          fields={{
            name: {dict: dict.form.fields.name},
            description: {dict: dict.form.fields.description},
            category: {
              dict: dict.form.fields.categories,
              list: categories.data as Categories,
              name: "Category",
            },
            button: dict.form.buttons.add
          }}
          relatedCategory={category.id}
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
