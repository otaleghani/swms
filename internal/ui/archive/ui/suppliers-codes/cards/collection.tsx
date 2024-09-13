import { ItemAndSupplierCodes, Variant, SupplierCode, Supplier } from "@/app/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
import { AddNewSupplierCodeDialog } from "../add_new/dialog";
import { DeleteSupplierCodeDialog } from "../delete/dialog";
import { EditSupplierCodeDialog } from "../edit/dialog";

interface SupplierCodesCardsCollextionProps {
  itemWithCodes: ItemAndSupplierCodes[];
  supplier: Supplier;
  locale: string;
  dict_add_dialog: any;
  dict_delete_dialog: any;
  dict_edit_dialog: any;
}

export default function SupplierCodesCardsCollection({
  itemWithCodes,
  supplier,
  locale,
  dict_add_dialog,
  dict_delete_dialog,
  dict_edit_dialog,
}: SupplierCodesCardsCollextionProps) {
  return (
    <>
      {itemWithCodes != undefined && itemWithCodes.map((item) => (
        <Card className="mb-4" key={item.item.id}> 
          <CardHeader className="pb-4">
            <CardTitle>
              <span className="font-semibold leading-none">
                {item.item.name}
              </span>
            </CardTitle>
            <CardDescription>{item.item.id}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            {item.variants.map((variant) => (
              <div>
                <div className="flex justify-between items-center
                py-2 font-semibold text-base">
                  <span>{variant.variant.name}</span>
                  <AddNewSupplierCodeDialog
                    supplier={supplier}
                    variant={variant.variant}
                    item={item.item}
                    locale={locale}
                    dict_add_dialog={dict_add_dialog}
                  />
                </div>
                  {variant.codes.map((code) => (
                    <div className="flex justify-between items-center py-2 border-t
                    last:border-y" key={code.id}>
                      <span>{code.code}</span>
                      <div className="flex gap-2">
                        <div>
                          <EditSupplierCodeDialog
                            supplierCode={code}
                            dict={dict_edit_dialog}
                            locale={locale} />
                        </div>
                        <div>
                          <DeleteSupplierCodeDialog 
                            item={code} 
                            dict={dict_delete_dialog}
                            locale={locale} />
                        </div>
                      </div>
                    </div>

                  ))}
              </div>
            ))}
          </CardContent>
          <CardFooter className="gap-2 text-sm">
            {
              // foreach code, add delete and edit button
            }
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
