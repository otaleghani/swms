import { getDictionary, Locale } from "@/lib/dictionaries";
import { getSubcategoryById, getSubcategories } from "@/app/lib/requests/subcategories/get";
import { getCategories, getCategoryBySubcategory } from "@/app/lib/requests/categories/get";

import { ScrollArea } from "@radix-ui/react-scroll-area";

import SubcategoryHeaderSingle from "@/app/ui/subcategories/headers/single";
import SubcategorySingleCard from "@/app/ui/subcategories/cards/single";

interface SubcategoryIdPageProps {
  params: {
    id: string;
    lang: string;
  };
}

export default async function SubcategoryIdPage({ 
  params 
}: SubcategoryIdPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  const pItem = getSubcategoryById(params.id);
  const pItemCategory = getCategoryBySubcategory(params.id);
  const pSubcategories = getSubcategories();
  const pCategories = getCategories();

  const [item, itemCategory, subcategories, categories] = 
    await Promise.all([pItem, pItemCategory, pSubcategories, pCategories]);

  return (
    <div className="grid xl:grid-cols-2">
      <div className="xl:border-r">
        <SubcategoryHeaderSingle
          item={item}
          itemCategory={itemCategory}
          locale={params.lang}
          dict_header={dict.subcategories.header_single} />
        <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
          <SubcategorySingleCard
            item={item}
            categories={categories}
            subcategories={subcategories}
            locale={params.lang}
            dict_card={dict.subcategories.card}
            dict_edit={dict.subcategories.edit_dialog}
            dict_delete={dict.subcategories.delete_dialog}
            dict_category_select={dict.categories.select_field}
            dict_subcategory_select={dict.subcategories.select_field} />
        </ScrollArea>
      </div>

      <div>
        {
          // items list
        }
      </div>

    </div>
  )
}
