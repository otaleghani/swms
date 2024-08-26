import SupplierHeaderCollection from "@/app/ui/suppliers/headers/collection";
import { getDictionary, Locale } from "@/lib/dictionaries";

interface SupplierPageProps {
  params: {
    lang: string;
  }
}

export default async function SupplierPage({
  params
  }: SupplierPageProps) {
  const dict = await getDictionary(params.lang as Locale);
  
  return (
    <SupplierHeaderCollection 
      dict={dict.suppliers}
      locale={params.lang}
    />
  )
}
