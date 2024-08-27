import SupplierHeaderCollection from "@/app/ui/suppliers/headers/collection";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getSuppliers, getSuppliersWithData } from "@/app/lib/requests/suppliers/get";
import SupplierCardsCollection from "@/app/ui/suppliers/cards/collection";

interface SupplierPageProps {
  params: {
    lang: string;
  }
}

export default async function SupplierPage({
  params
}: SupplierPageProps) {
  const dict = await getDictionary(params.lang as Locale);
  const pSuppliers = getSuppliers();
  const pSuppliersWithData = getSuppliersWithData();
  
  const [suppliers, suppliersWithData] = await Promise.all([pSuppliers, pSuppliersWithData]);
  
  return (
    <>
      <SupplierHeaderCollection 
        dict={dict.suppliers}
        locale={params.lang}
      />
      <div className="grid grid-cols-3 gap-4 p-4">
        <SupplierCardsCollection 
          suppliers={suppliersWithData}
          suppliers_collection={suppliers}
          locale={params.lang}
          dict_card={dict.suppliers.card}
          dict_delete={dict.suppliers.delete_form}
          dict_edit={dict.suppliers.edit_form}
          dict_supplier_select={dict.suppliers.select_field}
        />
      </div>
    </>
  )
}
