import { AddNewSupplierDialog } from "../add_new/dialog";

interface SupplierHeaderCollectionProps {
  dict: any;
  locale: string;
}

export default function SupplierHeaderCollection({
  dict,
  locale,
}: SupplierHeaderCollectionProps) {
  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <h1 className="font-semibold text-xl leading-none tracking-tight">{dict.header_collection.title}</h1>
      <AddNewSupplierDialog 
        dict_supplier_add_dialog={dict.add_dialog} 
        locale={locale} />
    </header>
  )
}
