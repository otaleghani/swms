import { Breadcrumbs } from "../../general/breadcrumbs";
import { Category } from "@/app/lib/types";
import { AddNewSubcategoryDialog } from "../../subcategories/add-new/dialog";

interface SingleCategoryHeaderProps {
  dict_header: any;
  dict_subcategory_add_dialog: any;
  locale: string;
  item: Category;
}

export default function CategoryHeaderSingle({ 
  dict_header, 
  dict_subcategory_add_dialog, 
  locale, 
  item
}: SingleCategoryHeaderProps) {

  const breadcrumbs_items = [
    {
      label: dict_header.breadcrumbs.category,
      url: "/categories",
    },
  ]

  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs 
          items={breadcrumbs_items} 
          current_item={item.name} />
      </div>
      <AddNewSubcategoryDialog
        category={item}
        dict_subcategory_add_dialog={dict_subcategory_add_dialog}
        locale={locale} />
    </header>
  )
}
