import { SupplierInfo, Supplier } from "@/app/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
import { EditSupplierDialog } from "../edit/dialog";
import { DeleteSupplierDialog } from "../delete/dialog";

interface SupplierCardSingleProps {
  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_supplier_select: any;
  item: SupplierInfo;
  suppliers: Supplier[];
}

export default function SupplierCardSingle({ 
  locale,
  item,
  suppliers,
  dict_card,
  dict_edit,
  dict_delete,
  dict_supplier_select,
}: SupplierCardSingleProps) {

  return (
    <>
      <Card className="mb-4"> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">{item.supplier.name}</span></CardTitle>
          <CardDescription>{item.supplier.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex justify-between py-2 border-y">
            <span>{dict_card.labels.codes_count}</span>
            <span>{item.codes_count}</span>
          </div>
        </CardContent>
        <CardFooter className="gap-2 text-sm">
          <DeleteSupplierDialog
            dict={dict_delete}
            locale={locale}
            item={item.supplier}
            suppliers={suppliers}
            dict_supplier_select={dict_supplier_select}
          />
          <EditSupplierDialog 
            dict={dict_edit}
            locale={locale}
            supplier={item.supplier} />
        </CardFooter>
      </Card>
    </>
  )
}
