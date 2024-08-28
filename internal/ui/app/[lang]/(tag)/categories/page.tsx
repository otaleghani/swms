import { getDictionary, Locale } from "@/lib/dictionaries";
import { getCategories } from "@/app/lib/requests/categories/get";

import CategoryHeaderSingle from "@/app/ui/categories/headers/collection";
import CollectionCategoryCards from "@/app/ui/categories/cards/collection";
//import CollectionZonesCards from "@/app/ui/zones/collection_cards";

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
      <CategoryHeaderSingle dict={dict.categories} lang={params.lang} />
      <main className="p-4 grid xl:grid-cols-5 gap-2">
        <CollectionCategoryCards
          categories={categories}
          locale={params.lang}
          dict_card={dict.categories.card} />
      </main>
    </div>
  )
}
