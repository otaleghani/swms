import { AddNewCategoryDialog } from "../add_new/dialog";

interface CategoryHeaderProps {
  dict: any;
  dict_add_dialog: any;
  locale: string;
}

export default function CategoryHeaderCollection({ 
  dict, 
  dict_add_dialog, 
  locale 
}: CategoryHeaderProps) {
  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <h1 className="font-semibold text-xl leading-none tracking-tight">{dict.header_collection.title}</h1>
      <AddNewCategoryDialog 
        dict_category_add_dialog={dict_add_dialog}
        locale={locale} />
    </header>
  )
}
