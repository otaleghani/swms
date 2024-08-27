import { ItemAndSupplierCodes, Variant, SupplierCode, Supplier } from "@/app/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
import { AddNewSupplierCodeDialog } from "../add_new/dialog";

interface SupplierCodesCardsCollextionProps {
  itemWithCodes: ItemAndSupplierCodes[];
  supplier: Supplier;
  locale: string;
  dict_supplier_code_add_dialog: any;
}

export default function SupplierCodesCardsCollection({
  itemWithCodes,
  supplier,
  locale,
  dict_supplier_code_add_dialog,
}: SupplierCodesCardsCollextionProps) {
  return (
    <>
      {itemWithCodes.map((item) => (
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
                <div className="flex justify-between 
                py-2 font-semibold text-base">
                  <span>{variant.variant.name}</span>
                  <AddNewSupplierCodeDialog
                    supplier={supplier}
                    variant={variant.variant}
                    item={item.item}
                    locale={locale}
                    dict_supplier_code_add_dialog={dict_supplier_code_add_dialog}
                  />
                </div>
                  {variant.codes.map((code) => (
                    <div className="flex justify-between py-2 border-t
                    last:border-y" key={code.id}>
                      <span>{code.code}</span>
                      <div className="flex gap-2">
                        <div>edit</div>
                        <div>delete</div>
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
