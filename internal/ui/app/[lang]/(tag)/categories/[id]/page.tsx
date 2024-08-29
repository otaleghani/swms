import { getDictionary, Locale } from "@/lib/dictionaries";
import { getCategories, getCategoryById } from "@/app/lib/requests/categories/get";
import { getSubcategories, getSubcategoriesByCategory } from "@/app/lib/requests/subcategories/get";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import CategoryHeaderSingle from "@/app/ui/categories/headers/single";
import CategoryCardSingle from "@/app/ui/categories/cards/single";
import CollectionSubcategoryCards from "@/app/ui/subcategories/cards/collection";

interface CategoryIdPageProps {
  params: {
    id: string;
    lang: string;
  };
}

export default async function CategoryIdPage({ 
  params 
}: CategoryIdPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  const pItem = getCategoryById(params.id);
  const pItemSubcategories = getSubcategoriesByCategory(params.id);
  const pCategories = getCategories();
  const pSubcategories = getSubcategories();

  const [item, itemSubcategories, categories, subcategories] = 
    await Promise.all([pItem, pItemSubcategories, pCategories, pSubcategories]);

  return (
    <div className="grid xl:grid-cols-2">
      <div className="xl:border-r">
        <CategoryHeaderSingle
          dict_header={dict.categories.header_single}
          dict_subcategory_add_dialog={dict.subcategories.add_dialog}
          locale={params.lang}
          item={item}
        />
        <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
          <CategoryCardSingle
            locale={params.lang}
            item={item}
            categories={categories}
            dict_card={dict.categories.card}
            dict_edit={dict.categories.edit_dialog}
            dict_delete={dict.categories.delete_dialog}
            dict_category_select={dict.categories.select_field} />
          <div className="grid xl:grid-cols-2 gap-4">
            <CollectionSubcategoryCards 
              categories={categories}
              subcategories={subcategories}
              itemSubcategories={itemSubcategories}
              locale={params.lang}
              dict_card={dict.subcategories.card} 
              dict_delete={dict.subcategories.delete_dialog}
              dict_edit={dict.subcategories.edit_dialog}
              dict_subcategory_select={dict.subcategories.select_field}
              dict_category_select={dict.categories.select_field} />
          </div>
        </ScrollArea>
        {
        // <SupplierHeaderSingle
        //   dict_header={dict.suppliers.header_single}
        //   locale={params.lang}
        //   item={item} />
        // <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
        //   <SupplierCardSingle
        //     locale={params.lang}
        //     item={item}
        //     suppliers={suppliers}
        //     dict_card={dict.suppliers.card}
        //     dict_edit={dict.suppliers.edit_form}
        //     dict_delete={dict.suppliers.delete_form}
        //     dict_supplier_select={dict.suppliers.select_field}
        //   />
        // </ScrollArea>
        }
      </div>

      <div>
        {
        // <SupplierCodesHeaderCollection 
        //   dict_header={dict.supplier_codes.header_collection}
        //   items_count={itemCodesByItem != undefined ? itemCodesByItem.length : 0}
        //   locale={params.lang} />
        // <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
        //   <SupplierCodesCardsCollection 
        //     supplier={item.supplier}
        //     locale={params.lang}
        //     dict_add_dialog={dict.supplier_codes.add_dialog}
        //     dict_delete_dialog={dict.supplier_codes.delete_dialog}
        //     dict_edit_dialog={dict.supplier_codes.edit_dialog}
        //     itemWithCodes={itemCodesByItem} />
        // </ScrollArea>
        }
      </div>

    </div>
  )
}
