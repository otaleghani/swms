import { getDictionary, Locale } from "@/lib/dictionaries";
import SubcategoryHeaderCollection from "@/app/ui/subcategories/headers/collection"
import { getSubcategories } from "@/app/lib/requests/subcategories/get"
import CollectionSubcategoryCards from "@/app/ui/subcategories/cards/collection";
import { getCategories } from "@/app/lib/requests/categories/get";
import { Category, Subcategory } from "@/app/lib/types";

interface SubcategoryPageProps {
  params: {
    lang: string;
  }
}

export default async function SubcategoryPage({
  params
}: SubcategoryPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  const pSubcategories = getSubcategories();
  const pCategories = getCategories();

  const [subcategories, categories] = 
    await Promise.all([pSubcategories, pCategories]);

  return(
    <>
     <SubcategoryHeaderCollection 
        dict={dict.subcategories}
        locale={params.lang} />
      <div className="grid grid-cols-4 gap-4 p-4">
        <CollectionSubcategoryCards
          locale={params.lang}
          dict_card={dict.subcategories.card}
          dict_edit={dict.subcategories.edit_dialog}
          dict_delete={dict.subcategories.delete_dialog}
          dict_category_select={dict.categories.select_field}
          dict_subcategory_select={dict.subcategories.select_field}
          categories={categories}
          itemSubcategories={subcategories}
          subcategories={subcategories} />
      </div>
    </>
  )
}
