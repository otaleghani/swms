import { Category } from "@/app/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"

import { EditCategoryDialog } from "../edit/dialog";
import { DeleteCategoryDialog } from "../delete/dialog";

interface CategoryCardSingleProps {
  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_category_select: any;
  item: Category;
  categories: Category[];
}

export default function CategoryCardSingle({ 
  locale,
  item,
  categories,
  dict_card,
  dict_edit,
  dict_delete,
  dict_category_select,
}: CategoryCardSingleProps) {

  return (
    <>
      <Card className="mb-4"> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">{item.name}</span></CardTitle>
          <CardDescription>{item.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex justify-between py-2 border-y">
            <span>{item.description}</span>
          </div>
        </CardContent>
        <CardFooter className="gap-2 text-sm">
          <DeleteCategoryDialog
            dict={dict_delete}
            locale={locale}
            item={item}
            categories={categories}
            dict_category_select={dict_category_select}
          />
          <EditCategoryDialog 
            dict={dict_edit}
            locale={locale}
            category={item} />
        </CardFooter>
      </Card>
    </>
  )
}
