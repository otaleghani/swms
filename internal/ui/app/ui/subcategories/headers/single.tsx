import { Breadcrumbs } from "../../general/breadcrumbs";
import { Category, Subcategory } from "@/app/lib/types";

interface SingleSubcategoryHeaderProps {
  dict_header: any;
  locale: string;
  item: Subcategory;
  itemCategory: Category;
}

export default function SubcategoryHeaderSingle({ 
  dict_header, 
  locale, 
  item,
  itemCategory
}: SingleSubcategoryHeaderProps) {

  const breadcrumbs_items = [
    {
      label: dict_header.breadcrumbs.category,
      url: "/categories",
    },
    {
      label: itemCategory.name,
      url: `/categories/${itemCategory.id}`,
    },
    {
      label: dict_header.breadcrumbs.subcategory,
      url: "/subcategories",
    },
  ]

  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs 
          items={breadcrumbs_items} 
          current_item={item.name} />
      </div>
    </header>
  )
}
