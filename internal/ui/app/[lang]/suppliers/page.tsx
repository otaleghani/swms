import SupplierHeaderCollection from "@/app/ui/suppliers/headers/collection";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { GetSuppliersWithData } from "@/app/lib/requests/suppliers/get";
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
  const pSuppliers = GetSuppliersWithData();
  
  const [suppliers] = await Promise.all([pSuppliers]);
  
  return (
    <>
      <SupplierHeaderCollection 
        dict={dict.suppliers}
        locale={params.lang}
      />
      <SupplierCardsCollection 
        suppliers={suppliers}
      />
    </>
  )
}
