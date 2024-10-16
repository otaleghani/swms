import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";

import { Category, Subcategory } from "@/app/lib/types";
import { DeleteSubcategoryDialog } from "../delete/dialog";
import { EditSubcategoryDialog } from "../edit/dialog";

interface SubcategoryCardProps {
  item: Subcategory;
  categories: Category[];
  subcategories: Subcategory[];
  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_category_select: any;
  dict_subcategory_select: any;
}

export default function SubcategorySingleCard({ 
  item,
  categories,
  subcategories,
  locale, 
  dict_card, 
  dict_edit, 
  dict_delete, 
  dict_category_select,
  dict_subcategory_select
}: SubcategoryCardProps) {

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>{item.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <span>{item.description}</span>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 text-sm">
          <DeleteSubcategoryDialog
            dict={dict_delete}
            locale={locale}
            item={item}
            subcategories={subcategories}
            dict_subcategory_select={dict_subcategory_select} />
          <EditSubcategoryDialog
            dict={dict_edit}
            locale={locale}
            subcategory={item}
            categories={categories}
            dict_category_select={dict_category_select} />
        </CardFooter>
      </Card>
    </>
  )
}
