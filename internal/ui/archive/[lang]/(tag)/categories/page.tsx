import { getDictionary, Locale } from "@/lib/dictionaries";
import { getCategories } from "@/app/lib/requests/categories/get";

import CollectionCategoryCards from "@/app/ui/categories/cards/collection";
import CategoryHeaderCollection from "@/app/ui/categories/headers/collection";

interface CategoryPageProps {
  params: {
    lang: string;
  }
}

export default async function ZonesPage({ params }: CategoryPageProps ) {
  const dict = await getDictionary(params.lang as Locale);

  const pCategories = getCategories();
  const [categories] = await Promise.all([pCategories])

  return (
    <div>
      <CategoryHeaderCollection 
        dict={dict.categories} 
        dict_add_dialog={dict.categories.add_dialog}
        locale={params.lang} />
      <main className="p-4 grid xl:grid-cols-5 gap-2">
        <CollectionCategoryCards
          categories={categories}
          locale={params.lang}
          dict_card={dict.categories.card} 
          dict_delete={dict.categories.delete_dialog}
          dict_edit={dict.categories.edit_dialog}
          dict_category_select={dict.categories.select_field} />
      </main>
    </div>
  )
}
