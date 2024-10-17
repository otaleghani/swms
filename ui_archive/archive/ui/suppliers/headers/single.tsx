import { Breadcrumbs } from "../../general/breadcrumbs";
import { SupplierInfo } from "@/app/lib/types";

interface SingleSupplierHeaderProps {
  dict_header: any;
  locale: string;
  item: SupplierInfo;
}

export default function SupplierHeaderSingle({ 
  dict_header, 
  locale, 
  item
}: SingleSupplierHeaderProps) {

  const breadcrumbs_items = [
    {
      label: dict_header.breadcrumbs.supplier,
      url: "/suppliers",
    },
  ]

  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs 
          items={breadcrumbs_items} 
          current_item={item.supplier.name} />
      </div>
    </header>
  )
}
