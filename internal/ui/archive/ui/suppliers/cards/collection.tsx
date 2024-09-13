import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { EditSupplierDialog } from "../edit/dialog";
import { SupplierInfo, Supplier } from "@/app/lib/types"
import { DeleteSupplierDialog } from "../delete/dialog";

interface SupplierCardsCollectionProps {
  suppliers: SupplierInfo[];
  suppliers_collection: Supplier[];
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_supplier_select: any;
  locale: string;
}

export default function SupplierCardsCollection({
  suppliers,
  suppliers_collection,
  dict_card,
  dict_delete,
  dict_edit,
  dict_supplier_select,
  locale,
}: SupplierCardsCollectionProps) {
  return (
    <>
      {suppliers.map((item: SupplierInfo) => (
        <Card>
          <CardHeader>
            <CardTitle>{item.supplier.name}</CardTitle>
            <CardDescription>{item.supplier.id}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="flex justify-between py-2 border-y">
              <span>{dict_card.labels.codes_count}</span>
              <span>{item.codes_count}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 text-sm">
            <DeleteSupplierDialog
              dict={dict_delete}
              locale={locale}
              item={item.supplier}
              suppliers={suppliers_collection}
              dict_supplier_select={dict_supplier_select}
            />
            <EditSupplierDialog 
              dict={dict_edit}
              locale={locale}
              supplier={item.supplier} />
            <Button asChild variant="default">
              <Link href={`/suppliers/${item.supplier.id}`}>{dict_card.labels.view}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
