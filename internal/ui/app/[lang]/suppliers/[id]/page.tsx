import { getDictionary, Locale } from "@/lib/dictionaries";
import { getSupplierByIdWithData, getSuppliers } from "@/app/lib/requests/suppliers/get";
import { getItemAndCodesBySupplier } from "@/app/lib/requests/suppliers/codes/get";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import SupplierHeaderSingle from "@/app/ui/suppliers/headers/single";
import SupplierCardSingle from "@/app/ui/suppliers/cards/single";
import SupplierCodesHeaderCollection from "@/app/ui/suppliers-codes/headers/collection";
import SupplierCodesCardsCollection from "@/app/ui/suppliers-codes/cards/collection";

interface SupplierIdPageProps {
  params: {
    id: string;
    lang: string;
  };
}

export default async function SupplierIdPage({ params }: SupplierIdPageProps) {
  const dict = await getDictionary(params.lang as Locale);

  const pItem = getSupplierByIdWithData(params.id);
  const pItemCodesByItem = getItemAndCodesBySupplier(params.id);
  const pSuppliers = getSuppliers();

  const [item, itemCodesByItem, suppliers] = 
    await Promise.all([pItem, pItemCodesByItem, pSuppliers]);

  return (
    <div className="grid xl:grid-cols-2">
      <div className="xl:border-r">
        <SupplierHeaderSingle
          dict_header={dict.suppliers.header_single}
          locale={params.lang}
          item={item} />
        <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
          <SupplierCardSingle
            locale={params.lang}
            item={item}
            suppliers={suppliers}
            dict_card={dict.suppliers.card}
            dict_edit={dict.suppliers.edit_dialog}
            dict_delete={dict.suppliers.delete_dialog}
            dict_supplier_select={dict.suppliers.select_field}
          />
        </ScrollArea>
      </div>

      <div>
        <SupplierCodesHeaderCollection 
          dict_header={dict.supplier_codes.header_collection}
          items_count={itemCodesByItem != undefined ? itemCodesByItem.length : 0}
          locale={params.lang} />
        <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
          <SupplierCodesCardsCollection 
            supplier={item.supplier}
            locale={params.lang}
            dict_add_dialog={dict.supplier_codes.add_dialog}
            dict_delete_dialog={dict.supplier_codes.delete_dialog}
            dict_edit_dialog={dict.supplier_codes.edit_dialog}
            itemWithCodes={itemCodesByItem} />
        </ScrollArea>
      </div>

    </div>
  )
}
