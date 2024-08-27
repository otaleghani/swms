import { ItemAndSupplierCodes } from "@/app/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"

interface SupplierCodesCardsCollextionProps {
  itemWithCodes: ItemAndSupplierCodes[];
}

export default function SupplierCodesCardsCollection({
  itemWithCodes 
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
            <div>
              <div className="py-2 font-semibold text-base">
                Name of variant
              </div>
              {item.codes.map((code) => (
                <div className="flex justify-between py-2 border-t
                last:border-y" key={code.id}>
                  <span>{code.code}</span>
                  <div className="flex gap-2">
                    <div>botton</div>
                    <div>botton</div>
                  </div>
                </div>
              ))}
            </div>
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
